import { IRoleRepository, FindManyOptions, FindOneOptions } from '../../interfaces/role.repository';
import { IRole } from '../..';
import { RoleEntityFactory } from '../entities';
import { getRepository, EntitySchema, Repository, FindConditions } from 'typeorm';

export class RoleTypeormRepository implements IRoleRepository {
  protected roleEntity: EntitySchema<IRole>;

  protected get ormRepo(): Repository<IRole> {
    return getRepository(this.roleEntity);
  }

  constructor() {
    this.roleEntity = RoleEntityFactory.getRoleEntity();
  }

  save(role: IRole): Promise<IRole> {
    return this.ormRepo.save(role);
  }

  find(filter?: FindManyOptions<IRole>): Promise<IRole[]> {
    if((filter.where as FindConditions<IRole>).parent) {
      const parentCondition = (filter.where as FindConditions<IRole>).parent as FindConditions<IRole>;
      if(parentCondition.title) {
        const entityName = this.roleEntity.options.name;
        const query = this.ormRepo.createQueryBuilder(entityName).where('parentTitle = :title', {title: parentCondition.title});
        return query.getMany();
      }
    }
    
    return this.ormRepo.find(filter);
  }

  findOne(filter: FindOneOptions<IRole>): Promise<IRole> {
    return this.ormRepo.findOne(filter);
  }

  update(filter: FindConditions<IRole>, role: IRole): Promise<any> {
    return this.ormRepo.update(filter, role);
  }

  delete(filter: FindConditions<IRole>): Promise<any> {
    return this.ormRepo.delete(filter);
  }
}
