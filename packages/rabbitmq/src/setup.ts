import { logger } from '@/libs/logger/winston';
import { getChannels } from '@/libs/rabbitmq';
import { Exchange, Queue, RoutingKey } from '@/libs/rabbitmq/constants';
import { MessageHandlerProps } from '@/libs/rabbitmq/types';
import amqplib, { ConsumeMessage } from 'amqplib';
import { EXCHANGES, QUEUE_BINDINGS, QUEUES } from './constants';
import { enrollmentToCoursesHandler } from './enrollment-to-courses.handler';
import { mediaToCoursesHandler } from './media-to-courses.handler';

let isShuttingDown = false;
let isReconnecting = false;
let connection: amqplib.ChannelModel | undefined;
let producerChannel: amqplib.ConfirmChannel | undefined;
let consumerChannel: amqplib.Channel | undefined;

export const getConnection = () => {
  if (!connection) throw new Error('RabbitMQ not connected');
  return connection;
};

export const getChannels = () => {
  if (!producerChannel || !consumerChannel)
    throw new Error('RabbitMQ channels not set');

  return { producerChannel, consumerChannel };
};

export const connectRabbitMQ = async (url: string) => {
  connection = await amqplib.connect(url);
  logger.info('rabbitmq:connected');

  connection.on('error', (err) => logger.error(`rabbitmq:error ${err}`));

  connection.on('close', () => {
    if (isShuttingDown || isReconnecting) return;

    logger.warn('rabbitmq:connection closed, reconnecting');

    const reconnect = async () => {
      isReconnecting = true;

      while (isReconnecting) {
        try {
          await setConnection();
          isReconnecting = false;
        } catch (err) {
          logger.error(`rabbitmq:error ${err}`);
          await new Promise((res) => setTimeout(res, 5000));
        }
      }
    };
    void reconnect();
  });

  try {
    const connection = getConnection();

    producerChannel = await connection.createConfirmChannel();
    consumerChannel = await connection.createChannel();
    logger.info('rabbitmq:channels sets');

    const bindEvents = (ch: amqplib.Channel) => {
      ch.on('error', (err) => logger.error(`rabbitmq:error ${err}`));

      ch.on('close', () => {
        logger.warn('rabbitmq:channel closed, closing connection');

        const closeConnection = async () => {
          try {
            await connection.close();
          } catch (err) {
            logger.error(`rabbitmq:error ${err}`);
          }
        };
        void closeConnection();
      });
    };
    bindEvents(producerChannel);
    bindEvents(consumerChannel);
  } catch (err) {
    logger.error(`rabbitmq:error ${err}`);
    await closeConnection();
  }
};

export const initRabbitMQ = async () => {
  // Connection
  await connectRabbitMQ();

  // Exchanges
  await assertProducerExchange(EXCHANGES.COURSES);

  const consumerExchanges = [EXCHANGES.MEDIA, EXCHANGES.ENROLLMENT] as const;
  for (const ex of consumerExchanges) {
    await assertConsumerExchange(ex);
  }

  // Queues
  const queueBindings = [
    QUEUE_BINDINGS.MEDIA_TO_COURSES,
    QUEUE_BINDINGS.ENROLLMENT_TO_COURSES,
  ] as const;
  for (const binding of queueBindings) {
    await setupConsumerQueue(binding);
  }

  // Consumers
  const consumers = [
    [QUEUES.MEDIA_TO_COURSES, mediaToCoursesHandler],
    [QUEUES.ENROLLMENT_TO_COURSES, enrollmentToCoursesHandler],
  ] as const;
  for (const [queue, handler] of consumers) {
    await startConsumer(queue, handler);
  }
};

export const shutdownRabbitMQ = async () => {
  isShuttingDown = true;

  if (connection) await connection.close();
  connection = undefined;
};

export const assertProducerExchange = async (exchange: Exchange) => {
  const { producerChannel } = getChannels();
  await producerChannel.assertExchange(exchange, 'direct', { durable: true });
};

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
        logger.error(`rabbitmq:error ${err}`);
        consumerChannel.nack(msg, false, false);
      }
    })();
  };
  await consumerChannel.consume(queue, onMessage, {
    noAck: false, // Messages require manual acknowledgment
  });
};
