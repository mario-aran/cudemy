// docs: https://github.com/expressjs/morgan?tab=readme-ov-file#examples

import morgan from 'morgan';
import { logger } from './winston';

export const morganInit = morgan('combined', {
  stream: { write: (message) => logger.http(message.trim()) },
});
