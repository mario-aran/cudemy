import { Exchange, Queue, QueueBinding, RoutingKey } from '@/constants';
import amqplib, { ConsumeMessage } from 'amqplib';

// ---------------------------
// TYPES
// ---------------------------

type MessagePayload = Record<string, unknown>;

interface MessageHandlerProps {
  routingKey: RoutingKey;
  payload: MessagePayload;
}

type MessageHandler = (props: MessageHandlerProps) => Promise<void> | void;

interface StartConsumerProps {
  channel: amqplib.Channel;
  prefetch?: number;
  queue: Queue;
  exchange: Exchange;
  routingKeys: RoutingKey[];
  messageHandler: MessageHandler;
}

interface InitRabbitMQProps {
  producer: {
    channel: amqplib.ConfirmChannel;
    exchange: Exchange;
  };
  consumers: {
    channel: amqplib.Channel;
    exchanges: Exchange[];
    bindings: (QueueBinding & { messageHandler: MessageHandler })[];
  };
}

// ---------------------------
// UTILS
// ---------------------------

const assertExchange = async (channel: amqplib.Channel, exchange: Exchange) =>
  channel.assertExchange(exchange, 'direct', { durable: true });

const startConsumer = async ({
  channel,
  prefetch = 1,
  queue,
  routingKeys,
  exchange,
  messageHandler,
}: StartConsumerProps) => {
  // Queue
  await channel.assertQueue(queue, { durable: true });

  for (const key of routingKeys) {
    await channel.bindQueue(queue, exchange, key);
  }

  // Prefetch
  await channel.prefetch(prefetch);

  // Consumer
  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    if (msg.properties.contentType !== 'application/json') {
      channel.nack(msg, false, false);
      return;
    }

    void (async () => {
      try {
        await messageHandler({
          routingKey: msg.fields.routingKey as RoutingKey,
          payload: JSON.parse(msg.content.toString()) as MessagePayload,
        });
        channel.ack(msg);
      } catch {
        channel.nack(msg, false, false);
      }
    })();
  };

  await channel.consume(queue, onMessage, {
    noAck: false, // Messages require manual acknowledgment
  });
};

export const initRabbitMQ = async ({
  producer,
  consumers,
}: InitRabbitMQProps) => {
  // Producer exchange
  await assertExchange(producer.channel, producer.exchange);

  // Consumer exchanges
  for (const consumerExchange of consumers.exchanges) {
    await assertExchange(consumers.channel, consumerExchange);
  }

  // Consumers
  for (const binding of consumers.bindings) {
    await startConsumer({
      channel: consumers.channel,
      queue: binding.queue,
      exchange: binding.exchange,
      routingKeys: binding.routingKeys,
      messageHandler: binding.messageHandler,
    });
  }
};
