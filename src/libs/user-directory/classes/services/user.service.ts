import { IUser } from '../../interfaces/';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../models';
import { IUserService } from '../../interfaces/services/user.service.interface';

export class UserService implements IUserService {
  constructor(protected repository: Repository<User>) {}

  create(user: User): Promise<IUser> {
    return this.repository.save(user);
  }

  update(id: string, user: User): Promise<any> {
    return this.repository.update(id, user);
  }

  findAll(condition?: object): Promise<IUser[]> {
    return this.repository.find({ relations: ['role'] });
  }

  findById(id: string): Promise<IUser> {
    return this.repository.findOne(id, { relations: ['role'] });
  }

  getByRoleTitle(roleTitle: string): Promise<IUser[]> {
    return this.repository.find({ where: { role: { title: roleTitle } }, relations: ['role'] });
  }
}
