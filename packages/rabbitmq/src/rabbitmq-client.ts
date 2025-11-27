import amqp, {
  AmqpConnectionManager,
  ChannelWrapper,
} from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { Exchange, QueueBinding, RoutingKey } from './constants';

interface MessageProps {
  routingKey: RoutingKey;
  payload: object;
}

interface ConsumerConfig {
  queueBinding: QueueBinding;
  prefetch?: number;
  messageHandler: (props: MessageProps) => Promise<void> | void;
}

interface RabbitMQClientProps {
  rabbitmqUrl: string;
  producerExchange: Exchange;
  consumerConfigs: ConsumerConfig[];
}

export class RabbitMQClient {
  private connection: AmqpConnectionManager | undefined;
  private producerChannel: ChannelWrapper | undefined;
  private consumerChannel: ChannelWrapper | undefined;

  constructor(private readonly props: RabbitMQClientProps) {}

  async init() {
    // Connection
    this.connection = amqp.connect([this.props.rabbitmqUrl]);

    // Channels
    this.producerChannel = this.connection.createChannel({ json: true });
    await this.producerChannel.addSetup((channel: ConfirmChannel) =>
      channel.assertExchange(this.props.producerExchange, 'direct', {
        durable: true,
      }),
    );

    this.consumerChannel = this.connection.createChannel();
    await this.consumerChannel.addSetup((channel: ConfirmChannel) =>
      Promise.all(
        this.props.consumerConfigs.map((config) =>
          this.setupConsumer(channel, config),
        ),
      ),
    );
  }

  async publish({ routingKey, payload }: MessageProps) {
    if (!this.producerChannel)
      throw new Error('Producer channel not initialized');

    await this.producerChannel.publish(
      this.props.producerExchange,
      routingKey,
      payload,
      { persistent: true },
    );
  }

  async close() {
    await this.producerChannel?.close();
    await this.consumerChannel?.close();
    await this.connection?.close();

    this.producerChannel = undefined;
    this.consumerChannel = undefined;
    this.connection = undefined;
  }

  private async setupConsumer(
    channel: ConfirmChannel,
    {
      queueBinding: { exchange, queue, routingKeys },
      prefetch = 1,
      messageHandler,
    }: ConsumerConfig,
  ) {
    // Exchange
    await channel.assertExchange(exchange, 'direct', { durable: true });

    // Queue
    await channel.assertQueue(queue, { durable: true });

    await Promise.all(
      routingKeys.map((key) => channel.bindQueue(queue, exchange, key)),
    );

    // Consumer
    await channel.prefetch(prefetch);

    await channel.consume(
      queue,
      (msg) => {
        if (!msg) return;

        void (async () => {
          try {
            await messageHandler({
              routingKey: msg.fields.routingKey as MessageProps['routingKey'],
              payload: JSON.parse(
                msg.content.toString(),
              ) as MessageProps['payload'],
            });
            channel.ack(msg);
          } catch {
            channel.nack(msg, false, false);
          }
        })();
      },
      {
        noAck: false, // To use ack-nack
      },
    );
  }
}
