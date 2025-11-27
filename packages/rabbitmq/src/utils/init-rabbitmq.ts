import { Exchange, QueueBinding, RoutingKey } from '@/constants';
import amqp from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

// ---------------------------
// TYPES
// ---------------------------

type Payload = Record<string, unknown>;

interface InitRabbitMQProps {
  connectionUrl: string;
  producerExchange: Exchange;
  consumerConfigs: {
    queueBinding: QueueBinding;
    prefetch?: number;
    messageHandler: (props: {
      routingKey: RoutingKey;
      payload: Payload;
    }) => Promise<void> | void;
  }[];
}

// ---------------------------
// UTILS
// ---------------------------

export const initRabbitMQ = ({
  connectionUrl,
  producerExchange,
  consumerConfigs,
}: InitRabbitMQProps) => {
  const connection = amqp.connect([connectionUrl]);

  const producerChannel = connection.createChannel({
    setup: async (channel: ConfirmChannel) => {
      await channel.assertExchange(producerExchange, 'direct', {
        durable: true,
      });
    },
  });

  const consumerChannel = connection.createChannel({
    setup: async (channel: ConfirmChannel) => {
      for (const {
        queueBinding: { exchange, queue, routingKeys },
        prefetch = 1,
        messageHandler,
      } of consumerConfigs) {
        // Exchange
        await channel.assertExchange(exchange, 'direct', { durable: true });

        // Queue
        await channel.assertQueue(queue, { durable: true });

        for (const key of routingKeys) {
          await channel.bindQueue(queue, exchange, key);
        }

        // Consumer
        await channel.prefetch(prefetch);

        await channel.consume(
          queue,
          (msg) => {
            if (!msg) return;

            void (async () => {
              try {
                await messageHandler({
                  routingKey: msg.fields.routingKey as RoutingKey,
                  payload: JSON.parse(msg.content.toString()) as Payload,
                });
                channel.ack(msg);
              } catch {
                channel.nack(msg, false, false);
              }
            })();
          },
          {
            noAck: false, // Messages require manual acknowledgment
          },
        );
      }
    },
  });

  return { connection, producerChannel, consumerChannel };
};
