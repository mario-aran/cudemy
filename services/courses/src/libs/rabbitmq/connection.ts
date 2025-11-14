import { RABBITMQ_URL } from '@/config/env';
import amqplib, { ConsumeMessage } from 'amqplib';
import {
  BINDINGS,
  Exchange,
  EXCHANGES,
  Queue,
  QUEUES,
  RoutingKey,
} from './constants';
import { enrollmentToCoursesHandler } from './handlers/enrollment-to-courses.handler';
import { medialToCoursesHandler } from './handlers/media-to-courses.handler';

// ---------------------------
// VALUES
// ---------------------------

let channel: amqplib.Channel | undefined;

// ---------------------------
// UTILS
// ---------------------------

export const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

const createExchange = async (exchange: Exchange) => {
  const channel = getChannel();
  await channel.assertExchange(exchange, 'direct', { durable: true });
};

const createQueue = async (queue: Queue) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });
};

const bindQueue = async ({
  queue,
  exchange,
  routingKeys,
}: {
  queue: Queue;
  exchange: Exchange;
  routingKeys: RoutingKey[];
}) => {
  const channel = getChannel();

  for (const key of routingKeys) {
    await channel.bindQueue(queue, exchange, key);
  }
};

const registerConsumer = async (
  queue: string,
  handler: (key: string, payload: unknown) => Promise<void> | void,
  prefetch = 1,
) => {
  const channel = getChannel();
  await channel.prefetch(prefetch);

  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    const key = msg.fields.routingKey;
    const rawPayload = msg.content.toString();

    void (async () => {
      try {
        await handler(key, JSON.parse(rawPayload));
        channel.ack(msg);
      } catch {
        channel.nack(msg, false, false);
      }
    })();
  };
  await channel.consume(queue, onMessage, { noAck: false });
};

// ---------------------------
// DERIVED UTILS
// ---------------------------

export const initRabbitMQ = async () => {
  // Channel
  const connection = await amqplib.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  // Exchanges
  await createExchange(EXCHANGES.COURSES);
  await createExchange(EXCHANGES.MEDIA);
  await createExchange(EXCHANGES.ENROLLMENT);

  // Queues
  await createQueue(QUEUES.MEDIA_TO_COURSES);
  await createQueue(QUEUES.ENROLLMENT_TO_COURSES);

  // Queue bindings
  await bindQueue(BINDINGS.MEDIA_TO_COURSES);
  await bindQueue(BINDINGS.ENROLLMENT_TO_COURSES);

  // Consumers
  await registerConsumer(QUEUES.MEDIA_TO_COURSES, medialToCoursesHandler);
  await registerConsumer(
    QUEUES.ENROLLMENT_TO_COURSES,
    enrollmentToCoursesHandler,
  );
};
