import express from 'express';
import { morganInit } from './libs/logger/morgan';
import { routes } from './routes';

// ---------------------------
// VALUES
// ---------------------------

export const app = express();

// ---------------------------
// MIDDLEWARES
// ---------------------------

app.use(morganInit);
app.use(express.json()); // Body parser
app.use(routes); // Must be placed after req middlewares
