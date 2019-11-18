import { IUser } from '../../interfaces/';
import { EntityManager } from 'typeorm';
import { User } from '../models';
import { IUserService } from '../../interfaces/services/user.service.interface';

export class UserService implements IUserService {

    constructor(protected manager: EntityManager) {}

    create(user: User): Promise<IUser> {
        return this.manager.save(user);
    }
}
