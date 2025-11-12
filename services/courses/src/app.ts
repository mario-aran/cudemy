import express from 'express';

export const app = express();

app.use('/', (_, res) => {
  res.json({ message: 'Hello courses' });
});
