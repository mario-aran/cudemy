import express from 'express';
import { EXCHANGES, ROUTING_KEYS } from './libs/rabbitmq/constants';
import { publishEvent } from './libs/rabbitmq/utils/publish-event';

export const app = express();

app.get('/', (_, res) => {
  res.json({ message: 'Hello courses' });
});

app.get('/rabbit', (_, res) => {
  publishEvent(EXCHANGES.COURSES, ROUTING_KEYS.LECTURE_CREATED, {
    message: 'Test rabbitmq',
  });

  res.status(201).send('courses.created published');
});
