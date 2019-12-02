import { IGuardUser, IRole, IGuardService } from '../interfaces';
import { intersection, flatten } from 'lodash';
import { IRoleRepository } from '../interfaces/role.repository';

export class GuardService implements IGuardService{
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
    const userPermissions = flatten(user.roles.map(role => role.permissions));

    if (requiredPermissions.length > userPermissions.length) return false;

    return intersection(userPermissions, requiredPermissions).length === requiredPermissions.length;
  }

  createRole(role: IRole) {
    return this.roleRepo.save(role);
  }

  findByParentTitle(parentTitle: string, loadChildren: boolean = true) {
    const where = { parent: { title: parentTitle } };
    const relations = loadChildren ? ['children'] : [];
    return this.roleRepo.find({ where, relations });
  }

  findByTitle(title: string) {
    return this.roleRepo.findOne({where: {title}});
  }
}
