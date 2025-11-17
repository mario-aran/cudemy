import { connectRabbitMQ } from './connection';
import { EXCHANGES, QUEUE_BINDINGS, QUEUES } from './constants';
import { enrollmentToCoursesHandler } from './message-handlers/enrollment-to-courses.handler';
import { mediaToCoursesHandler } from './message-handlers/media-to-courses.handler';
import { assertAndBindQueue, assertExchange, startConsumer } from './utils';

export const initRabbitMQ = async () => {
  // Connection
  await connectRabbitMQ();

  // Exchanges
  const exchanges = [
    EXCHANGES.COURSES,
    EXCHANGES.MEDIA,
    EXCHANGES.ENROLLMENT,
  ] as const;
  for (const exchange of exchanges) {
    await assertExchange(exchange);
  }

  // Queues
  const queueBindings = [
    QUEUE_BINDINGS.MEDIA_TO_COURSES,
    QUEUE_BINDINGS.ENROLLMENT_TO_COURSES,
  ] as const;
  for (const binding of queueBindings) {
    await assertAndBindQueue(binding);
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
