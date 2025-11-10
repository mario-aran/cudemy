// docs: https://github.com/winstonjs/winston?tab=readme-ov-file#logging

import { isProduction, isTest } from '@/config/env';
import winston from 'winston';

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(
    (el) => `${String(el.timestamp)} [${el.level}]: ${String(el.message)}`,
  ),
);

export const logger = winston.createLogger({
  silent: isTest, // Prevent logging during testing
  level: isProduction ? 'http' : 'debug', // Prevent verbose logs in production
  transports: [new winston.transports.Console({ format: consoleFormat })],
});
