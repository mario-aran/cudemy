import { app } from './app';
import { PORT } from './config/env';
import { logger } from './lib/logger';
import { rabbitMQClient } from './lib/rabbitmq/rabbitmq-client';

// ---------------------------
// STARTUP
// ---------------------------

void (async () => {
  // Connections
  try {
    await rabbitMQClient.init();
  } catch (err) {
    logger.error(`startup:failed ${String(err)}`);
    process.exit(1);
  }

  // Server
  const server = app.listen(PORT, () =>
    logger.info(`startup:success on port ${String(PORT)}`),
  );
  server.on('error', (err) => {
    logger.error(`startup:failed ${err}`);
    process.exit(1);
  });
})();

// ---------------------------
// SHUTDOWN
// ---------------------------

const gracefulShutdown = () =>
  void (async () => {
    logger.info('shutdown:start');

    // Shutdown resources
    const shutdownFns = [() => rabbitMQClient.close()];
    for (const fn of shutdownFns) {
      try {
        await fn();
      } catch (err) {
        logger.error(`shutdown:failed ${String(err)}`);
      }
    }

    // Process exit
    logger.info('shutdown:complete');
    process.exit(0);
  })();
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
