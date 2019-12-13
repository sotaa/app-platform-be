import { IGuardService, IGuardUser, IRole } from '../../libs/guard';
import { Request as IRequest } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';

@injectable()
export class RoleController {
  constructor(@inject(TYPES.IGuardService) protected guardService: IGuardService) {}

  fetch(req: IRequest): Promise<IRole[]> {
    const user = req.body['user'] as IGuardUser;
    return this.guardService.findRolesByParentTitle(user.role.title);
  }

  update(title: string, role: IRole): Promise<IRole> {
    return this.guardService.updateRole(title, role);
  }

  create(role: IRole): Promise<IRole> {
    return this.guardService.createRole(role);
  }

  delete(title: string): Promise<any> {
    return this.guardService.deleteRole(title);
  }
}
