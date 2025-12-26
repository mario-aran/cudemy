import express from 'express';
import { morganMiddleware } from './lib/logger';

export const app = express();

app.use(morganMiddleware);
app.use(express.json()); // Body parser
