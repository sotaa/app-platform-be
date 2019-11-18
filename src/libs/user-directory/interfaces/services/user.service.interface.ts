import { IUser } from '../models/user.interface';

export interface IUserService {
    create(user: IUser): Promise<IUser>;
}