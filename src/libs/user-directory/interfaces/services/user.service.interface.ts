import { IUser } from '../models/user.interface';

export interface IUserService {
    create(email: string, userId: string | number): Promise<IUser>;
}