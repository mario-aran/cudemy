import express from 'express';
import { publishEvent } from './libs/rabbitmq/connection';
import { EXCHANGES, ROUTING_KEYS } from './libs/rabbitmq/constants';

export const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'Hello courses' });
});

app.get('/rabbit', (_, res) => {
  publishEvent({
    exchange: EXCHANGES.COURSES,
    routingKey: ROUTING_KEYS.COURSES.LECTURE_CREATED,
    payload: { message: 'Test rabbitmq' },
  });

  res.status(201).send('courses.created published');
});
