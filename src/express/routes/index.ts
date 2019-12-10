import { ILogger } from '../../logger';
import { Router } from 'express';
import { iocContainer, TYPES } from '../../ioc';
import { applicationRouter } from './application.router';
import { ApplicationController } from '../controllers';

class UserDirectoryRouter {
  router: Router;
  constructor(protected logger: ILogger) {
    this.router = Router();
    this.init();
  }
  init() {
    this.router.use('/applications', applicationRouter(iocContainer.get(ApplicationController), this.logger));
  }
}

const userDirectoryRouter = (logger: ILogger) => new UserDirectoryRouter(logger).router;
export { userDirectoryRouter };
