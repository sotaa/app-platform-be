import { PaymentPlansController } from '../controllers';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ILogger } from '../../logger';

class PaymentPlanRouter {
  router: Router;
  constructor(protected controller: PaymentPlansController, protected logger: ILogger) {
    this.router = Router();
    this.assign(this.router);
  }

  assign(router: Router) {
    router.get('/:id', this.routeToFind.bind(this));
    router.get('/', this.routeToList.bind(this));
    router.post('/', this.routeToCreate.bind(this));
    router.put('/:id', this.routeToUpdate.bind(this));
    router.delete('/:id', this.routeToDelete.bind(this));
  }

  private async routeToDelete(req: Request, res: Response) {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(BAD_REQUEST).json(new Error('Id must be a number.'));
      return;
    }

    try {
      const result = await this.controller.delete(id);
      res.json(result);
    } catch (e) {
      res.status(INTERNAL_SERVER_ERROR);
      this.logger.error(e);
    }
  }

  private async routeToUpdate(req: Request, res: Response) {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(BAD_REQUEST).json(new Error('Id must be a number.'));
      return;
    }

    try {
      const result = await this.controller.update(id, req.body);
      res.json(result);
    } catch (e) {
      res.status(INTERNAL_SERVER_ERROR);
      this.logger.error(e);
    }
  }

  private async routeToCreate(req: Request, res: Response) {
    try {
      const result = await this.controller.create(req.body);
      res.json(result);
    } catch (e) {
      res.status(INTERNAL_SERVER_ERROR);
      this.logger.error(e);
    }
  }
  private async routeToList(req: Request, res: Response) {
    try {
      const result = await this.controller.list(req.query);
      res.json(result);
    } catch (e) {
      res.status(INTERNAL_SERVER_ERROR);
      this.logger.error(e);
    }
  }

  private async routeToFind(req: Request, res: Response) {
    const id = Number.parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(BAD_REQUEST).json(new Error('Id must be a number.'));
      return;
    }

    try {
      const result = await this.controller.find(id);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.status(INTERNAL_SERVER_ERROR).send(e);
    }
  }
}

const paymentPlanRouter = (controller: PaymentPlansController, logger: ILogger = console) =>
  new PaymentPlanRouter(controller, logger).router;

export { paymentPlanRouter };
