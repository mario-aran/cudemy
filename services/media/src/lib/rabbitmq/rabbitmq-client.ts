import { RABBITMQ_URL } from '@/config/env';
import { EXCHANGES, QUEUE_BINDINGS, RabbitMQClient } from '@scope/rabbitmq';
import { coursesToMediaHandler } from './message-handlers/courses-to-media.handler';

export const rabbitMQClient = new RabbitMQClient({
  rabbitmqUrl: RABBITMQ_URL,
  producerExchange: EXCHANGES.MEDIA,
  consumerConfigs: [
    {
      queueBinding: QUEUE_BINDINGS.COURSES_TO_MEDIA,
      messageHandler: coursesToMediaHandler,
    },
  ],
});
