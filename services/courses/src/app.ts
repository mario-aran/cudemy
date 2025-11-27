import express from 'express';
import { morganMiddleware } from './libs/logger';
import { routes } from './routes';

export const app = express();

app.use(morganMiddleware);
app.use(express.json()); // Body parser
app.use(routes); // Must be placed after req middlewares
