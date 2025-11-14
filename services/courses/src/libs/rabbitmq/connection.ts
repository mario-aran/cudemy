import { RABBITMQ_URL } from '@/config/env';
import amqplib, { ConsumeMessage } from 'amqplib';
import {
  Exchange,
  EXCHANGES,
  Queue,
  QUEUE_BINDINGS,
  QUEUES,
  RoutingKey,
} from './constants';
import { enrollmentToCoursesHandler } from './handlers/enrollment-to-courses.handler';
import { mediaToCoursesHandler } from './handlers/media-to-courses.handler';
import { EventPayload, MessageHandlerProps } from './types';

// ---------------------------
// CHANNEL
// ---------------------------

let channel: amqplib.Channel | undefined;

const setChannel = async () => {
  const connection = await amqplib.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
};

const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

// ---------------------------
// DECLARATIONS
// ---------------------------

const assertExchange = async (exchange: Exchange) => {
  const channel = getChannel();
  await channel.assertExchange(exchange, 'direct', { durable: true });
};

const assertQueue = async (queue: Queue) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });
};

const bindQueue = async (obj: {
  queue: Queue;
  exchange: Exchange;
  routingKeys: RoutingKey[];
}) => {
  const channel = getChannel();

  for (const key of obj.routingKeys)
    await channel.bindQueue(obj.queue, obj.exchange, key);
};

// ---------------------------
// CONSUMERS
// ---------------------------

const startConsumer = async (
  queue: Queue,
  handler: (props: MessageHandlerProps) => Promise<void> | void,
  prefetch = 1,
) => {
  const channel = getChannel();
  await channel.prefetch(prefetch);

  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    void (async () => {
      try {
        const routingKey = msg.fields
          .routingKey as MessageHandlerProps['routingKey'];
        const payload = JSON.parse(
          msg.content.toString(),
        ) as MessageHandlerProps['payload'];

        await handler({ routingKey, payload });
        channel.ack(msg);
      } catch {
        channel.nack(msg, false, false);
      }
    })();
  };
  await channel.consume(queue, onMessage, { noAck: false });
};

export const initRabbitMQ = async () => {
  // Channel
  await setChannel();

  // Exchanges
  await assertExchange(EXCHANGES.COURSES);
  await assertExchange(EXCHANGES.MEDIA);
  await assertExchange(EXCHANGES.ENROLLMENT);

  // Queues
  await assertQueue(QUEUES.MEDIA_TO_COURSES);
  await assertQueue(QUEUES.ENROLLMENT_TO_COURSES);

  // Queue bindings
  await bindQueue(QUEUE_BINDINGS.MEDIA_TO_COURSES);
  await bindQueue(QUEUE_BINDINGS.ENROLLMENT_TO_COURSES);

  // Consumers
  await startConsumer(QUEUES.MEDIA_TO_COURSES, mediaToCoursesHandler);
  await startConsumer(QUEUES.ENROLLMENT_TO_COURSES, enrollmentToCoursesHandler);
};

// ---------------------------
// PRODUCER
// ---------------------------

export const publishEvent = (obj: {
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: EventPayload;
}) => {
  const channel = getChannel();
  const content = Buffer.from(JSON.stringify(obj.payload));

  channel.publish(obj.exchange, obj.routingKey, content, {
    contentType: 'application/json',
    persistent: true,
    mandatory: true,
  });
};
