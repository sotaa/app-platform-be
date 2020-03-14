import { EntitySchema } from 'typeorm';
import { IRole } from '../../';

/**
 * Returns a configured typeorm EntitySchema instance for roles.
 * @param entityName The name of entity
 * @param userEntityName User entity name
 * @param userRolesPropertyName The property name which defines roles array in property entity.
 * @param tableName Name of the table for storing roles data in it.
 */
export class RoleEntityFactory {
  private static roleEntity: EntitySchema<IRole>;

  static create(
    entityName: string,
    userEntityName: string,
    userRolesPropertyName: string,
    tableName: string = entityName
  ) {

    // create role entity based on inputs.
    this.roleEntity = new EntitySchema<IRole>({
      name: entityName,
      tableName: tableName,
      columns: {
        title: {
          type: String,
          primary: true,
          nullable: false
        },
        permissions: {
          type: 'simple-array'
        }
      },
      relations: {
        users: {
          type: 'one-to-many',
          target: userEntityName,
          inverseSide: userRolesPropertyName,
        },
        parent: {
          type: 'many-to-one',
          target: entityName,
          treeChildren: true
        },
        children: {
          type: 'one-to-many',
          target: entityName,
          treeParent: true,
          cascade: true
        }
      }
    });

    return this.getRoleEntity();
  }

  static getRoleEntity() {
    return this.roleEntity;
  }
}
