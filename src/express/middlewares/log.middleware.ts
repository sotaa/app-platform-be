import { Request, Response } from 'express';
import { ILogger } from '../../logger';

export const logMiddleware = (logger: ILogger) =>
   (request: Request, response: Response, next: Function) => {
      logger.info({request, response});
      next();
  };
