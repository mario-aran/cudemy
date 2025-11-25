import { app } from './app';
import { PORT } from './config/env';
import { logger } from './libs/logger';

// ---------------------------
// STARTUP
// ---------------------------

(() => {
  // try {
  // } catch (err) {
  //   logger.error(`startup:failed ${err}`);
  //   process.exit(1);
  // }

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
  void (() => {
    logger.info('shutdown:start');

    // Shutdown resources
    // const shutdownFunctions = [];
    // for (const shutdown of shutdownFunctions) {
    //   try {
    //     await shutdown();
    //   } catch (err) {
    //     logger.error(`startup:failed ${err}`);
    //   }
    // }

    // Process exit
    logger.info('shutdown:complete');
    process.exit(0);
  })();
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
