import express from 'express';
import { PORT } from './config/env';
import { logger } from './libs/logger';

export const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'Hello courses' });
});

app.listen(PORT, () => {
  logger.info(`startup:success on port ${String(PORT)}`);
});
