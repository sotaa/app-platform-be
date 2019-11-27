import { EntitySchema } from 'typeorm';
import { IRole } from '../../';

export const RoleEntity = new EntitySchema<IRole>({
    name: 'role',
    columns: {
        title: {
            type: String,
            primary: true,
            nullable: false
        },
        permissions: {
            type: 'simple-array',
            array: true
        }
    },
    relations: {
        users: {
            type: 'many-to-many',
            cascade: true,
            target: 'guard_user',
            inverseSide: 'roles'
        }
    }
});