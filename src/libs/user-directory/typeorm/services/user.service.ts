import { IUser } from '../..';
import { IUserService } from '../../interfaces';
import { getManager, EntityManager } from 'typeorm';
import { User } from '../entities';

export class UserService implements IUserService{
  
    protected manager: EntityManager;

    constructor() {
        this.manager = getManager();
    }
    
    create(user: IUser): Promise<IUser> {
        return this.manager.save(user);
    }

    save(user: IUser): Promise<IUser> {
      return this.manager.save(user);
    }

    update(condition: string | number | Partial<IUser>, user: Partial<IUser>): Promise<object> {
       return this.manager.update(User,condition, user as any);
    }

    delete(id: string | number | Partial<IUser> | number[] | string[]): Promise<object> {
        return this.manager.delete(User, id);
    }

    find(condition?: object): Promise<IUser[]> {
        return this.manager.find(User, condition);
    }
    findById(id: string | number): Promise<IUser> {
        return this.manager.findOne(User, id);
    }
    findByIds(ids: number[] | string[]): Promise<IUser[]> {
        return this.manager.findByIds(User, ids);
    }
}
