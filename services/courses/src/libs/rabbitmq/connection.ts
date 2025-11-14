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
import { mediaToCoursesHandler } from './handlers/media-to-courses.handler';

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

const bindQueue = async (obj: {
  queue: Queue;
  exchange: Exchange;
  routingKeys: RoutingKey[];
}) => {
  const channel = getChannel();

  for (const key of obj.routingKeys)
    await channel.bindQueue(obj.queue, obj.exchange, key);
};

const registerConsumer = async (
  queue: Queue,
  handler: (
    routingKey: RoutingKey,
    payload: Record<string, unknown>,
  ) => Promise<void> | void,
  prefetch = 1,
) => {
  const channel = getChannel();
  await channel.prefetch(prefetch);

  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    void (async () => {
      try {
        const routingKey = msg.fields.routingKey as RoutingKey;
        const payload = JSON.parse(msg.content.toString()) as Record<
          string,
          unknown
        >;

        await handler(routingKey, payload);
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
  await registerConsumer(QUEUES.MEDIA_TO_COURSES, mediaToCoursesHandler);
  await registerConsumer(
    QUEUES.ENROLLMENT_TO_COURSES,
    enrollmentToCoursesHandler,
  );
};

export const publishEvent = (obj: {
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: Record<string, unknown>;
}) => {
  const channel = getChannel();
  const content = Buffer.from(JSON.stringify(obj.payload));

  channel.publish(obj.exchange, obj.routingKey, content, {
    contentType: 'application/json',
    persistent: true,
    mandatory: true,
  });
};
