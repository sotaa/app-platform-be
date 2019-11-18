import { IUser } from '../../interfaces/';
import { EntityManager } from 'typeorm';
import { User } from '../models';
import { IUserService } from '../../interfaces/services/user.service.interface';

export class UserService implements IUserService {

    constructor(protected manager: EntityManager) {}

    create(email: string, userId: string): Promise<IUser> {
        const user = this.manager.create(User, {email, id: userId});
        return this.manager.save(user);
    }
}
