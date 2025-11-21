import { PATH_SEGMENTS } from '@/constants/paths';
import { Router } from 'express';
import { filesRoutes } from './files.routes';

// ---------------------------
// ROUTER
// ---------------------------

export const routes = Router();

// ---------------------------
// API ROUTES
// ---------------------------

routes.get(PATH_SEGMENTS.HEALTH, (_, res) => res.json({ status: 'ok' }));
routes.use(PATH_SEGMENTS.FILES, filesRoutes);
