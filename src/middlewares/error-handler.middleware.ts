import { Response, Request, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  res.status(500).send('Page not found');
};
