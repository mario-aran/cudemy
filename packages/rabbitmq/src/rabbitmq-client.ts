import amqp, {
  AmqpConnectionManager,
  ChannelWrapper,
} from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { Exchange, QueueBinding, RoutingKey } from './constants';

interface MessageProps {
  routingKey: RoutingKey;
  content: Record<string, unknown>;
}

interface ConsumerConfig {
  queueBinding: QueueBinding;
  prefetch?: number;
  messageHandler: (props: MessageProps) => Promise<void> | void;
}

export class RabbitMQClient {
  private connection: AmqpConnectionManager | undefined;
  private producerChannel: ChannelWrapper | undefined;
  private consumerChannel: ChannelWrapper | undefined;

  constructor(
    private readonly rabbitmqUrl: string,
    private readonly producerExchange: Exchange,
    private readonly consumerConfigs: ConsumerConfig[],
  ) {}

  async init() {
    // Connection
    this.connection = amqp.connect([this.rabbitmqUrl]);

    // Channels
    this.producerChannel = this.connection.createChannel({ json: true });
    await this.producerChannel.addSetup((channel: ConfirmChannel) =>
      channel.assertExchange(this.producerExchange, 'direct', {
        durable: true,
      }),
    );

    this.consumerChannel = this.connection.createChannel({ json: true });
    await this.consumerChannel.addSetup((channel: ConfirmChannel) =>
      Promise.all(
        this.consumerConfigs.map((config) =>
          this.setupConsumer(channel, config),
        ),
      ),
    );
  }

  async publish({ routingKey, content }: MessageProps) {
    if (!this.producerChannel)
      throw new Error('Producer channel not initialized');

    await this.producerChannel.publish(
      this.producerExchange,
      routingKey,
      content,
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
              content: msg.content as unknown as MessageProps['content'], // Already JSON-parsed by channel wrapper
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
