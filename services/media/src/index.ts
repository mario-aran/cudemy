import express from 'express';

const PORT = 3002;

const app = express();

app.use('/', (_, res) => {
  res.json({ message: 'Hello media' });
});

app.listen(PORT, () => {
  console.log(`Application started successfully on port ${String(PORT)}`);
});
