import express from 'express';
import { morganMiddleware } from './libs/logger';
import { routes } from './routes';

// ---------------------------
// VALUES
// ---------------------------

export const app = express();

// ---------------------------
// MIDDLEWARES
// ---------------------------

app.use(morganMiddleware);
app.use(express.json()); // Body parser
app.use(routes); // Must be placed after req middlewares
