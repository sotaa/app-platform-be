import { PaymentController } from '../controllers';
import { Request, Response, Router } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ILogger } from '../../logger';
import { iocContainer, TYPES } from '../../ioc';
import { ITenant } from '../../libs/user-directory/interfaces/models/tenant.model';

class PaymentRouter {
  router: Router;
  constructor(protected controller: PaymentController, protected logger: ILogger) {
    this.router = Router();
    this.assign(this.router);
  }

  assign(router: Router) {
    router.get('/buy/:planId', this.routeToBuy.bind(this));
    router.get('/verify', this.routeToVerify.bind(this));
  }

  private async routeToBuy(req: Request, res: Response) {
    const result = await this.controller.buy(req.params.planId, req, res);
    res.send(result);
  }

  private async routeToVerify(req: Request, res: Response) {
    const tenant = iocContainer.get<ITenant>(TYPES.ITenant);
    try {
      await this.controller.verify(req.query);
      res.redirect(tenant.successPaymentPage);
    } catch (e) {
      this.logger.error(e);
      res.redirect(tenant.failedPaymentPage);
    }
  }
}

const paymentRouter = (controller: PaymentController, logger: ILogger = console) =>
  new PaymentRouter(controller, logger).router;

export { paymentRouter };
