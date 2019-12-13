import { ILogger } from '../../logger';
import { Router } from 'express';
import { iocContainer, TYPES } from '../../ioc';
import { applicationRouter } from './application.router';
import { ApplicationController, AuthController, RoleController } from '../controllers';
import { authRouter } from './auth.routes';
import { roleRouter } from './role.router';

class UserDirectoryRouter {
  router: Router;
  constructor(protected logger: ILogger) {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.use('/applications', applicationRouter(iocContainer.get(ApplicationController), this.logger));
    this.router.use('/auth', authRouter(iocContainer.get(AuthController), this.logger));
    this.router.use('/payment', authRouter(iocContainer.get(AuthController), this.logger));
    this.router.use('/role', roleRouter(iocContainer.get(RoleController), this.logger));
  }
}

const userDirectoryRouter = (logger: ILogger) => new UserDirectoryRouter(logger).router;
export { userDirectoryRouter };
