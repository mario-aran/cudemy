import { Request, Response } from 'express';

export const getFileDownload = (req: Request, res: Response) => {
  const paramsId = req.params.id;
  res.json({ paramsId });
};

export const createFile = (req: Request, res: Response) => {
  const paramsId = req.params.id;
  res.json({ ...req.body, paramsId });
};
