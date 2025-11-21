// docs: https://github.com/winstonjs/winston?tab=readme-ov-file#logging

import winston from 'winston';

const consoleFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.printf(
    (el) => `${String(el.timestamp)} [${el.level}]: ${String(el.message)}`,
  ),
);

export const createLogger = (obj: { isSilent: boolean; isVerbose: boolean }) =>
  winston.createLogger({
    silent: obj.isSilent, // Enable/disable logs
    level: obj.isVerbose ? 'debug' : 'http', // Enable/disable verbose logs
    transports: [new winston.transports.Console({ format: consoleFormat })],
  });
