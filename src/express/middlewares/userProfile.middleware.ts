import {
 USER_EDIT,
 USER_READ,
} from '../../config/permissions.const';

export const userProfile = (req: any, res: any, next: Function) => {
  const paramId = +req.params.id;
  const userId = req.user.user.id;
  const userPermissions = req.user.role.permissions;
  let hasPermission;

  if (paramId === userId) {
    return next();
  } else {
    req.method === 'GET'
      ? (hasPermission = userPermissions.find((f: any) => f == USER_READ))
      : req.method === 'PUT'
      ? (hasPermission = userPermissions.find((f: any) => f == USER_EDIT))
      : null;
    if (hasPermission) return next();
    else {
      res.status(403).send({ message: 'Forbidden' });
    }
  }
};
