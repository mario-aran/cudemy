// docs: https://github.com/expressjs/morgan?tab=readme-ov-file#examples

import morgan from 'morgan';
import winston from 'winston';

export const createMorganInit = (logger: winston.Logger) =>
  morgan('combined', {
    stream: { write: (message) => logger.http(message.trim()) },
  });
