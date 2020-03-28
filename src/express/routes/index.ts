import { ILogger } from '../../logger';
import { Router } from 'express';
import { iocContainer, TYPES } from '../../ioc';
import { applicationRouter } from './application.routes';
import {
  ApplicationController,
  AuthController,
  RoleController,
  UserController,
  PaymentPlansController,
  PaymentController
} from '../controllers';
import { authRouter } from './auth.routes';
import { roleRouter } from './role.routes';
import { userRouter } from './user.routes';
import { paymentPlanRouter } from './payment-plan.routes';
import { paymentRouter } from './payment.routes';

class UserDirectoryRouter {
  router: Router;
  constructor(protected logger: ILogger) {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.use('/applications', applicationRouter(iocContainer.get(ApplicationController), this.logger));
    this.router.use('/auth', authRouter(iocContainer.get(AuthController), this.logger));
    this.router.use('/payment', paymentRouter(iocContainer.get(PaymentController), this.logger));
    this.router.use('/payment-plans', paymentPlanRouter(iocContainer.get(PaymentPlansController), this.logger));
    this.router.use('/roles', roleRouter(iocContainer.get(RoleController), this.logger));
    this.router.use('/users', userRouter(iocContainer.get(UserController), this.logger));
  }
}

const userDirectoryRouter = (logger: ILogger) => new UserDirectoryRouter(logger).router;
export { userDirectoryRouter };
