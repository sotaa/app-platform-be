import { IGuardUser, IRole, IGuardService } from '../interfaces';
import { intersection } from 'lodash';
import { IRoleRepository } from '../interfaces/role.repository';
import { RoleHasUserError } from '../classes/errors';

export class GuardService implements IGuardService {
  constructor(protected roleRepo: IRoleRepository) {}
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

    return intersection(userPermissions, requiredPermissions).length === requiredPermissions.length;
  }

  createRole(role: IRole) {
    return this.roleRepo.save(role);
  }

  addOrUpdate(role: IRole): Promise<IRole> {
    return this.roleRepo.save(role);
  }

  findRolesByParentTitle(parentTitle: string) {
    const where = { parent: { title: parentTitle } };
    return this.roleRepo.find({ where } as any);
  }

  findRoleByTitle(title: string) {
    return this.roleRepo.findOne({ where: { title } });
  }

  updateRole(title: string, role: IRole) {
    return this.roleRepo.update({ title }, role);
  }

  async deleteRole(title: string) {
    const role = await this.roleRepo.findOne({ where: { title }, relations: ['users'] });
    if (role.users.length > 0) {
      throw new RoleHasUserError();
    }

    return this.roleRepo.delete({ title });
  }
}
