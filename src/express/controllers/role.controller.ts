import { IGuardService, IGuardUser, IRole } from '../../libs/guard';
import { Request as IRequest } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';

@injectable()
export class RoleController {
  constructor(@inject(TYPES.IGuardService) protected guardService: IGuardService) { }

  fetch(req: IRequest): Promise<IRole[]> {
    const user = (req as any).user as IGuardUser;
    return this.guardService.findRolesByParentTitle(user.role.title);
  }
  fetchByTitle(title: string): Promise<IRole> {
    return this.guardService.findRoleByTitle(title);
  }

  update(title: string, role: IRole, user: IGuardUser): Promise<IRole> {
    return this.guardService.updateRole(title, role, user);
  }

  // TODO: This method should check user permissions, cause a user can create a role with permissions same or less than itself.>>>
  // TODO: >>> in the other word creator permissions must include new role permissions and the permissions are not in creator permissions are not allowed.

  create(role: IRole, user: IGuardUser): Promise<IRole> {
    return this.guardService.createRole(role, user);
  }

  delete(title: string): Promise<any> {
    return this.guardService.deleteRole(title);
  }
}
