import { IUser } from '../models/user.interface';

export interface IUserService {
    create(user: IUser): Promise<IUser>;
    findById(id: string): Promise<IUser>;
    getByRoleTitle(roleTitle: string): Promise<IUser[]>;
}