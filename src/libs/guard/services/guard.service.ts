import { IGuardUser } from '../interfaces';
import { intersection, flatten, isEqual } from 'lodash';

export class GuardService {
    /**
     * check whether the use has all of required permissions or not.
     * @param user user
     * @param requiredPermissions array of required permissions.
     */
    hasPermissions(user: IGuardUser, requiredPermissions: string[]) {

   /** برای این که ببینیم کاربر همه دسترسی ها رو داره مشترکات بین دسترسی های لازم
    * و دسترسی های کاربر رو بدست میاریم اگر مشترکات با دسترسی های لازم برابر بود
    * پس کاربر همه دسترسی های لازم رو داره
    */
    const userPermissions = flatten(user.roles.map(role => role.permissions));
    return intersection(userPermissions, requiredPermissions).length === requiredPermissions.length;
  }
}
