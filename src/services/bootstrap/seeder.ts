import {Connection, Repository , EntityManager } from 'typeorm';
import { RoleEntityFactory } from '../../libs/guard/typeorm';
import { IRole, Role } from '../../libs/guard';
import * as permissionsObject from '../../config/permissions.const';
import { IIdentityUser, IdentityUser, IAuthService, IAuthData } from '../../libs/identity';
import { User } from '../../libs/user-directory/classes';
import { IdentityUserEntity } from '../../libs/identity/typeorm';
import { values } from 'lodash';
import { UserEntity } from '../../libs/user-directory/typeorm';
import { iocContainer, TYPES } from '../../ioc';
import { IUserService } from '../../libs/user-directory';

const permissions = values(permissionsObject);

const seedValues = require('../../config/seed-values.json');

const SUPER_ADMIN_ROLE_TITLE = 'Super Admin';

export async function seedDB(connection: Connection) {
  const roleEntity = RoleEntityFactory.getRoleEntity();
  const repo = connection.getRepository(roleEntity);
  
    const superAdmin = await createOrUpdateSuperAdminRole(repo);

  // create super admin users from seed-value.json file if they aren't existing.
  createSuperAdminUsers(connection.manager, seedValues.superAdmins,superAdmin);
}


function createOrUpdateSuperAdminRole(repo: Repository<IRole>) {
  const superAdmin = new Role(SUPER_ADMIN_ROLE_TITLE, permissions);
  return repo.save(superAdmin);
}

async function createSuperAdminUsers(manager: EntityManager , users: IAuthData[], superAdminRole: IRole) {

  await manager.transaction(async tManager => {
    const all = users.map(async (user: IAuthData) => {
      const authData = await iocContainer.get<IAuthService>(TYPES.IAuthService).register(user);
      const udUser = new User(user.username, authData.user.id);
      udUser.role = superAdminRole;
      await iocContainer.get<IUserService>(TYPES.IUserService).create(udUser);
    });

    return Promise.all(all);
  });
}
