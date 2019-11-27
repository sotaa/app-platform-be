import { IRouteConfig } from '.';
import { Application } from 'express';
import { allow } from './guard.middleware';

export function secure(app: Application, config: IRouteConfig[]) {
  config.forEach(item => {

    /**
     * the following line will add the middleware to dynamic path with dynamic method
     * the outcome will be something like this:
     * app.get('/route', (req,res,next) => {});
     */
    app[item.method](item.path, allow(item.claims));
  });
}
