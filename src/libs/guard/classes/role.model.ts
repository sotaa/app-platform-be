import { IRole } from '..';
import { IGuardUser } from '../interfaces';

export class Role implements IRole {
  users: IGuardUser[];
  constructor(public title: string,public permissions: string[], public parent?: IRole, public children: IRole[] = []) {}
}
