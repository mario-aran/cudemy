import express from 'express';

const PORT = 3001;

const app = express();

app.use('/', (_, res) => {
  res.json({ message: 'Hello courses' });
});

app.listen(PORT, () => {
  console.log(`Application started successfully on port ${String(PORT)}`);
});
