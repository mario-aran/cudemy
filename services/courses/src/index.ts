import { app } from './app';
import { PORT } from './config/env';
import { logger } from './libs/logger/winston';
import { initRabbitMQ, shutdownRabbitMQ } from './libs/rabbitmq/connection';

// ---------------------------
// STARTUP
// ---------------------------

void (async () => {
  // Start resources
  try {
    await initRabbitMQ();
  } catch (err) {
    logger.error('startup:failed', err);
    process.exit(1);
  }

  // Start server
  const server = app.listen(PORT, () =>
    logger.info('Application started successfully on port', PORT),
  );

  server.on('error', (err) => {
    logger.error('startup:failed', err);
    process.exit(1);
  });
})();

// ---------------------------
// SHUTDOWN
// ---------------------------

const gracefulShutdown = () => {
  void (async () => {
    logger.info('shutdown:start');

    // Shutdown resources
    const resources = [shutdownRabbitMQ];

    for (const shutdownResource of resources) {
      try {
        await shutdownResource();
      } catch (err) {
        logger.error('shutdown:error', err);
      }
    }

    // Process exit
    logger.info('shutdown:complete');
    process.exit(0);
  })();
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
