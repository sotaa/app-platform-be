import { EntitySchema } from 'typeorm';
import { IGuardUser } from '../../interfaces';

export const GuardUserEntity = new EntitySchema<IGuardUser>({
  name: 'guard_user',
  columns: {},
  relations: {
    roles: {
      type: 'many-to-many',
      target: 'roles',
      cascade: true,
      inverseSide: 'users'
    }
  }
});
