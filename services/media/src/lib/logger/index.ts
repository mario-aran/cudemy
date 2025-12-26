import { isDevelopment, isTest } from '@/config/env';
import { createLogger, createMorganMiddleware } from '@scope/logger';

export const logger = createLogger({
  isSilent: isTest,
  isVerbose: isDevelopment,
});

export const morganMiddleware = createMorganMiddleware(logger);
