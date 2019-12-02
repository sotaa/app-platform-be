import { IRoleRepository, FindManyOptions, FindOneOptions } from '../../interfaces/role.repository';
import { IRole } from '../..';
import { RoleEntityFactory } from '../entities';
import { getRepository, EntitySchema, Repository } from 'typeorm';

export class RoleTypeormRepository implements IRoleRepository {

  protected roleEntity: EntitySchema<IRole>;
  protected ormRepo: Repository<IRole>;

  constructor() {
    this.roleEntity = RoleEntityFactory.getRoleEntity();
    this.ormRepo = getRepository(this.roleEntity);
  }

  save(role: IRole): Promise<IRole> {
    return this.ormRepo.save(role);
  }

  find(filter?: FindManyOptions<IRole>): Promise<IRole[]> {
    return this.ormRepo.find(filter);
  }

  findOne(filter: FindOneOptions<IRole>): Promise<IRole> {
    return this.ormRepo.findOne(filter);
  }
}
