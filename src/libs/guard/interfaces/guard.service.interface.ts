import { IGuardUser } from './user.interface';
import { IRole } from '.';

export interface IGuardService {
  hasPermissions(user: IGuardUser, requiredPermissions: string[]): boolean;

  createRole(role: IRole): Promise<IRole>;

  findByParentTitle(parentTitle: string, loadChildren: boolean): Promise<IRole[]>;

  findByTitle(title: string): Promise<IRole>;
}
