import { app } from './app';
import { PORT } from './config/env';
import { logger } from './libs/logger/winston';

(() => {
  app.listen(PORT, () => {
    logger.info(`Application started successfully on port ${String(PORT)}`);
  });
})();
