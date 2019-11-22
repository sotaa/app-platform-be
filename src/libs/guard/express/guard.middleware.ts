import { GuardService } from '../services';

const guardService = new GuardService();
/**
 * Returns a middleware that allows access to users who has the required claims (permissions).
 * @param claims required claims to access the route.
 */
export function guardMiddleware(claims?: string[]) {
  return (req: any, res: any, next: Function) => {
    if (guardService.hasPermissions(req.user, claims)) {
      next();
    } else {
      res.setStatus(403).send(new Error('Forbidden'));
    }
  };
}
