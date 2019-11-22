import { IGuardUser } from './user.interface';

export interface IGuardService {
  hasPermissions(user: IGuardUser, requiredPermissions: string[]): boolean;
}
