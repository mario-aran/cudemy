import { ConsumeMessage } from 'amqplib';
import { getChannel } from './connection';
import { Exchange, Queue, RoutingKey } from './constants';
import { EventPayload, MessageHandlerProps } from './types';

// ---------------------------
// DECLARATIONS
// ---------------------------

export const assertExchange = async (exchange: Exchange) => {
  const channel = getChannel();
  await channel.assertExchange(exchange, 'direct', { durable: true });
};

export const setupQueue = async (obj: {
  queue: Queue;
  exchange: Exchange;
  routingKeys: RoutingKey[];
}) => {
  const channel = getChannel();

  await channel.assertQueue(obj.queue, {
    durable: true,
    arguments: { 'x-dead-letter-exchange': `${obj.queue}.dlx` },
  });

  for (const key of obj.routingKeys) {
    await channel.bindQueue(obj.queue, obj.exchange, key);
  }
};

export const setupDLQ = async (queue: string) => {
  const channel = getChannel();
  const dlx = `${queue}.dlx`;
  const dlq = `${queue}.dlq`;

  await channel.assertExchange(
    dlx,
    'fanout', // Ignores routingKey
    { durable: true },
  );
  await channel.assertQueue(dlq, { durable: true });
  await channel.bindQueue(dlq, dlx, '');
};

// ---------------------------
// CONSUMERS
// ---------------------------

export const startConsumer = async (
  queue: Queue,
  handler: (props: MessageHandlerProps) => Promise<void> | void,
  prefetch = 1,
) => {
  const channel = getChannel();
  await channel.prefetch(prefetch);

  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    if (msg.properties.contentType !== 'application/json') {
      channel.nack(msg, false, false);
      return;
    }

    void (async () => {
      try {
        await handler({
          routingKey: msg.fields
            .routingKey as MessageHandlerProps['routingKey'],
          payload: JSON.parse(
            msg.content.toString(),
          ) as MessageHandlerProps['payload'],
        });
        channel.ack(msg);
      } catch (err) {
        console.error('Message processing failed', err);
        channel.nack(msg, false, false);
      }
    })();
  };
  await channel.consume(queue, onMessage, {
    noAck: false, // Messages require manual acknowledgment
  });
};

// ---------------------------
// PRODUCERS
// ---------------------------

export const publishEvent = (obj: {
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: EventPayload;
}) => {
  const channel = getChannel();
  const content = Buffer.from(JSON.stringify(obj.payload));

  channel.publish(obj.exchange, obj.routingKey, content, {
    contentType: 'application/json', // Marks payload as JSON
    persistent: true, // Survives broker restarts
    mandatory: true, // Trigger return event if unroutable
  });
};
