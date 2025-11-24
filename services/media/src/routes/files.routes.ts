/* Endpoints:
GET    /files/:id/download -> Generate and return a signed download URL
POST   /files              -> Create file metadata and return a signed upload URL + file ID
*/

import { PATH_SEGMENTS } from '@/constants/paths';
import { createFile, getFileDownload } from '@/controllers/files.controller';
import { Router } from 'express';

export const filesRoutes = Router();

filesRoutes.get(PATH_SEGMENTS.ID, getFileDownload);
filesRoutes.post(`${PATH_SEGMENTS.ID}${PATH_SEGMENTS.DOWNLOAD}`, createFile);
