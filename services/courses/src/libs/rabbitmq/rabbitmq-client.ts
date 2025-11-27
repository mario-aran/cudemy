import { RABBITMQ_URL } from '@/config/env';
import { EXCHANGES, QUEUE_BINDINGS, RabbitMQClient } from '@scope/rabbitmq';
import { enrollmentToCoursesHandler } from './handlers/enrollment-to-courses.handler';
import { mediaToCoursesHandler } from './handlers/media-to-courses.handler';

export const rabbitMQClient = new RabbitMQClient({
  rabbitmqUrl: RABBITMQ_URL,
  producerExchange: EXCHANGES.COURSES,
  consumerConfigs: [
    {
      queueBinding: QUEUE_BINDINGS.MEDIA_TO_COURSES,
      messageHandler: mediaToCoursesHandler,
    },
    {
      queueBinding: QUEUE_BINDINGS.ENROLLMENT_TO_COURSES,
      messageHandler: enrollmentToCoursesHandler,
    },
  ],
});
