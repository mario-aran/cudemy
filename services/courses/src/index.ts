import { app } from './app';
import { PORT } from './config/env';
import { logger } from './libs/logger/winston';
import { closeRabbitMQ, initRabbitMQ } from './libs/rabbitmq/connection';

// ---------------------------
// STARTUP
// ---------------------------

void (async () => {
  await initRabbitMQ();

  app.listen(PORT, () => {
    logger.info('Application started successfully on port', PORT);
  });
})();

// ---------------------------
// SHUTDOWN
// ---------------------------

const gracefulShutdown = async () => {
  console.log('shutdown:start');

  // Close resources
  await closeRabbitMQ();

  // Process exit
  console.log('shutdown:complete');
  process.exit(0);
};

process.on('SIGINT', () => void gracefulShutdown());
process.on('SIGTERM', () => void gracefulShutdown());
