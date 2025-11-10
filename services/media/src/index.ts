import express from 'express';
import { PORT } from './config/env';
import { logger } from './libs/logger/winston';

const app = express();

app.use('/', (_, res) => {
  res.json({ message: 'Hello media' });
});

app.listen(PORT, () => {
  logger.info(`Application started successfully on port ${String(PORT)}`);
});
