import { IRouteConfig } from '.';
import { Application } from 'express';
import { allow } from './guard.middleware';
import { IGuardService } from '../interfaces';

/**
 * It will append allow middleware to the paths with required claims based on passed configuration object.
 * @param app express instance.
 * @param config route configs which should contain path and required claims.
 */
export function secure(app: Application, config: IRouteConfig[], guardService: IGuardService ) {
  config.forEach(item => {

    /**
     * the following line will add the middleware to dynamic path with dynamic method
     * the outcome will be something like this:
     * app.get('/route', (req,res,next) => {});
     */
    app[item.method](item.path, allow(guardService, item.claims));
  });
}
