import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers';
import { ILogger } from '../../logger';
import { BAD_REQUEST } from 'http-status-codes';

class AuthRouter {
  router: Router;
  constructor(protected controller: AuthController, protected logger: ILogger) {
    this.router = Router();
    this.assign(this.router);
  }

  assign(router: Router) {
    router.post('/register', this.routeToRegister.bind(this));
    router.post('/login', this.routeToLogin.bind(this));
    router.post('/reset-password', this.routeToResetPassword.bind(this));
    router.get('/token/:refreshToken', this.routeToRefreshToken.bind(this));
  }

  private async routeToRegister(req: Request, res: Response) {
    try {
      const result = await this.controller.register(req.body);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.status(BAD_REQUEST).send(e);
    }
  }

  private async routeToLogin(req: Request, res: Response) {
    try {
      const result = await this.controller.login(req.body);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.status(BAD_REQUEST).send(e);
    }
  }

  private async routeToResetPassword(req: Request, res: Response) {
    const username = req.body.username;
    if (!username) {
      res.status(BAD_REQUEST).json(new Error('Username is required.'));
      return;
    }

    try {
      const result = await this.controller.resetPassword(username);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.send(e);
    }
  }

  private async routeToRefreshToken(req: Request, res: Response) {
    const refreshToken = req.params.refreshToken;
    if (!refreshToken) {
      res.status(BAD_REQUEST).json(new Error('refresh token is required.'));
      return;
    }

    try {
      const result = await this.controller.renewToken(refreshToken);
      res.json(result);
    } catch (e) {
      this.logger.error(e);
      res.status(BAD_REQUEST).send(e);
    }
  }
}


const authRouter = (controller: AuthController, logger: ILogger = console) =>
  new AuthRouter(controller, logger).router;

export { authRouter };
