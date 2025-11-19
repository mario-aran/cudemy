import { logger } from '@/libs/logger/winston';
import { ConsumeMessage } from 'amqplib';
import { getChannels } from './connection';
import { Exchange, Queue, RoutingKey } from './constants';
import { EventPayload, MessageHandlerProps } from './types';

// ---------------------------
// PRODUCERS
// ---------------------------

export const assertProducerExchange = async (exchange: Exchange) => {
  const { producerChannel } = getChannels();
  await producerChannel.assertExchange(exchange, 'direct', { durable: true });
};

export const publishEvent = async (obj: {
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: EventPayload;
}) => {
  const { producerChannel } = getChannels();
  const content = Buffer.from(JSON.stringify(obj.payload));

  producerChannel.publish(obj.exchange, obj.routingKey, content, {
    contentType: 'application/json', // Marks payload as JSON
    persistent: true, // Survives broker restarts when enqueued in a durable queue
  });
  await producerChannel.waitForConfirms(); // Throws if broker fails to enqueue the message
};

// ---------------------------
// CONSUMERS
// ---------------------------

export const assertConsumerExchange = async (exchange: Exchange) => {
  const { consumerChannel } = getChannels();
  await consumerChannel.assertExchange(exchange, 'direct', { durable: true });
};

export const setupConsumerQueue = async (obj: {
  queue: Queue;
  exchange: Exchange;
  routingKeys: RoutingKey[];
}) => {
  const { consumerChannel } = getChannels();

  await consumerChannel.assertQueue(obj.queue, { durable: true });

  for (const key of obj.routingKeys) {
    await consumerChannel.bindQueue(obj.queue, obj.exchange, key);
  }
};

export const startConsumer = async (
  queue: Queue,
  handler: (props: MessageHandlerProps) => Promise<void> | void,
  prefetch = 1,
) => {
  const { consumerChannel } = getChannels();
  await consumerChannel.prefetch(prefetch);

  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    if (msg.properties.contentType !== 'application/json') {
      consumerChannel.nack(msg, false, false);
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
        consumerChannel.ack(msg);
      } catch (err) {
        logger.error('rabbitmq:error', err);
        consumerChannel.nack(msg, false, false);
      }
    })();
  };
  await consumerChannel.consume(queue, onMessage, {
    noAck: false, // Messages require manual acknowledgment
  });
};
