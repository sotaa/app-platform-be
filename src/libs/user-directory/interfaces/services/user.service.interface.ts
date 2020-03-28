import { IUser } from '../models/user.interface';

export interface IUserService {
  create(user: IUser): Promise<IUser>;
  update(email: string, user: IUser): Promise<any>;
  findById(id: string): Promise<IUser>;
  findAll(filter?: any): Promise<IUser[]>;
  getByRoleTitle(roleTitle: string): Promise<IUser[]>;
}
