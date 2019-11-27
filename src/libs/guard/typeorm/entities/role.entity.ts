import { EntitySchema } from 'typeorm';
import { IRole } from '../../';

/**
 * Returns a configured typeorm EntitySchema instance for roles.
 * @param entityName The name of entity
 * @param userEntityName User entity name
 * @param userRolesPropertyName The property name which defines roles array in property entity.
 * @param tableName Name of the table for storing roles data in it.
 */
export const RoleEntity = (
  entityName: string,
  userEntityName: string,
  userRolesPropertyName: string,
  tableName: string = entityName,
) =>
  new EntitySchema<IRole>({
    name: entityName,
    tableName: tableName,
    columns: {
      title: {
        type: String,
        primary: true,
        nullable: false
      },
      permissions: {
        type: 'simple-array',
      }
    },
    relations: {
      users: {
        type: 'many-to-many',
        target: userEntityName,
        inverseSide: userRolesPropertyName
      }
    }
  });
