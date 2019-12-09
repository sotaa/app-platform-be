import { IGuardUser } from './user.interface';
import { IRole } from '.';

export interface IGuardService {
  hasPermissions(user: IGuardUser, requiredPermissions: string[]): boolean;

  createRole(role: IRole): Promise<IRole>;
  
  addOrUpdate(role: IRole): Promise<IRole>;

  findRolesByParentTitle(parentTitle: string): Promise<IRole[]>;

  findRoleByTitle(title: string): Promise<IRole>;

  deleteRole(title: string): Promise<any>;

  updateRole(title: string, role: IRole): Promise<IRole>;
}
