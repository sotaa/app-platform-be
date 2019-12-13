import { RoleController } from '../controllers';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ILogger } from '../../logger';

class RoleRouter {
  router: Router;
  constructor(protected controller: RoleController, protected logger: ILogger) {
    this.router = Router();
    this.assign(this.router);
  }

  assign(router: Router) {
    router.get('/', this.routeToList.bind(this));
    router.post('/', this.routeToCreate.bind(this));
    router.put('/:title', this.routeToUpdate.bind(this));
    router.delete('/:title', this.routeToDelete.bind(this));
  }

  private async routeToDelete(req: Request, res: Response) {
    const title = req.params.title;

    try {
      const result = await this.controller.delete(title);
      res.json(result);
    } catch (e) {
      res.status(BAD_REQUEST);
      this.logger.error(e);
    }
  }

  private async routeToUpdate(req: Request, res: Response) {
    const title = req.params.title;

    try {
      const result = await this.controller.update(title, req.body);
      res.json(result);
    } catch (e) {
      res.status(BAD_REQUEST);
      this.logger.error(e);
    }
  }

  private async routeToCreate(req: Request, res: Response) {
    try {
      const result = await this.controller.create(req.body);
      res.json(result);
    } catch (e) {
      res.status(BAD_REQUEST);
      this.logger.error(e);
    }
  }

  private async routeToList(req: Request, res: Response) {
    try {
      const result = await this.controller.fetch(req);
      res.json(result);
    } catch (e) {
      res.status(BAD_REQUEST);
      this.logger.error(e);
    }
  }
}

const roleRouter = (controller: RoleController, logger: ILogger = console) => new RoleRouter(controller, logger).router;

export { roleRouter };
