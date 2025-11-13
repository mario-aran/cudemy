import { app } from './app';
import { PORT } from './config/env';
import { logger } from './libs/logger/winston';
import { initRabbitMQ } from './libs/rabbitmq/connection';

void (async () => {
  await initRabbitMQ();

  app.listen(PORT, () => {
    logger.info(`Application started successfully on port ${String(PORT)}`);
  });
})();
