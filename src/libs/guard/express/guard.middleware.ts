import { IGuardService } from '..';

/**
 * Returns a middleware that allows access to users who has the required claims (permissions).
 * @param claims required claims to access the route.
 */
export function allow(guardService: IGuardService, claims?: string[]) {
  return (req: any, res: any, next: Function) => {
    if (guardService.hasPermissions(req.user, claims)) {
      next();
    } else {
      res.status(403).send({ message: 'Forbidden' });
    }
  };
}
