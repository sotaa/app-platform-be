import { UserController } from '../controllers';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import { ILogger } from '../../logger';

class UserRouter {
  router: Router;
  constructor(protected controller: UserController, protected logger: ILogger) {
    this.router = Router();
    this.assign(this.router);
  }

  assign(router: Router) {
    router.put('/:id', this.routeToUpdate.bind(this));
    router.get('/', this.routeToFind.bind(this));
    router.get('/:id', this.routeToFindById.bind(this));
  }

  private async routeToUpdate(req: Request, res: Response) {
    try {
      const result = await this.controller.update(req.params.id, req.body, (req as any).user);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.status(BAD_REQUEST).send(e);
    }
  }

  private async routeToFind(req: Request, res: Response) {
    try {
      const result = await this.controller.getAll(req.query);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.status(BAD_REQUEST).send(e);
    }
  }
  private async routeToFindById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const result = await this.controller.get(id);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.status(BAD_REQUEST).send(e);
    }
  }
}

const userRouter = (controller: UserController, logger: ILogger = console) => new UserRouter(controller, logger).router;

export { userRouter };
