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
    router.post('/', this.routeToCreate.bind(this));
  }

  private async routeToCreate(req: Request, res: Response) {
    try {
        const result = await this.controller.create(req.body, req);
        res.json(result);
    } catch (e) {
        this.logger.error(e);
        res.status(BAD_REQUEST).send(e);
    }
  }
}

const userRouter = (controller: UserController, logger: ILogger = console) =>
  new UserRouter(controller, logger).router;

export { userRouter };
