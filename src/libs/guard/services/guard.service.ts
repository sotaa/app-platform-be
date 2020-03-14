import { BAD_REQUEST } from 'http-status-codes';
import { ErrorCodes } from './../../payments/lib/enums/error-codes.eum';
import { IGuardUser, IRole, IGuardService } from '../interfaces';
import { intersection, difference } from 'lodash';
import { IRoleRepository } from '../interfaces/role.repository';
import { RoleHasUserError, RoleAlreadyExists, PermissionsNotAllowed } from '../classes/errors';

export class GuardService implements IGuardService {
  constructor(protected roleRepo: IRoleRepository) { }
  /**
   * check whether the use has all of required permissions or not.
   * @param user user
   * @param requiredPermissions array of required permissions.
   */
  hasPermissions(user: IGuardUser, requiredPermissions: string[]) {
    if (!user) {
      throw Error('user is null or undefined.');
    }

    if (!requiredPermissions || !requiredPermissions.length) return true;

    /** برای این که ببینیم کاربر همه دسترسی ها رو داره مشترکات بین دسترسی های لازم
     * و دسترسی های کاربر رو بدست میاریم اگر مشترکات با دسترسی های لازم برابر بود
     * پس کاربر همه دسترسی های لازم رو داره
     */
    const userPermissions = user.role.permissions;

    if (requiredPermissions.length > userPermissions.length) return false;

    // return intersection(userPermissions, requiredPermissions).length === requiredPermissions.length;
    return difference(requiredPermissions, userPermissions).length === 0;
  }

  permissionsAreAllowed(role: IRole): boolean {
    if (role.permissions.length > role.parent.permissions.length) { return false };
    if (difference(role.permissions, role.parent.permissions).length > 0) { return false } else return true;
  }

  async createRole(role: IRole, user: IGuardUser): Promise<any> {
    let title = role.title;
    const roleExist = await this.roleRepo.findOne({ where: { title } });

    if (roleExist) {
      throw new RoleAlreadyExists();
    }

    if (!role.parent) {
      role.parent = user.role;
    }

    if (this.permissionsAreAllowed(role)) {
      return this.roleRepo.save(role);
    } else throw new PermissionsNotAllowed();
  }

  updateRole(title: string, role: IRole, user: IGuardUser): any {
    if (!role.parent) {
      role.parent = user.role;
    }
    if (this.permissionsAreAllowed(role)) {
      return this.roleRepo.update({ title }, role);
    } else throw new PermissionsNotAllowed();

  }

  addOrUpdate(role: IRole): Promise<IRole> {
    return this.roleRepo.save(role);
  }

  findRolesByParentTitle(parentTitle: string) {
    const where = { parent: { title: parentTitle } };
    return this.roleRepo.find({ where } as any);
  }

  findRoleByTitle(title: string) {
    return this.roleRepo.findOne({ where: { title }, relations: ['children'] });
  }

  async deleteRole(title: string) {
    const role = await this.roleRepo.findOne({ where: { title }, relations: ['users'] });
    if (role.users.length > 0) {
      throw new RoleHasUserError();
    }

    return this.roleRepo.delete({ title });
  }
}
