import express from 'express';
import { PORT } from './config/env';

export const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'Hello courses' });
});

app.listen(PORT, () => {
  console.log('startup:success on port', PORT);
});
