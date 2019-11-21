import { IRole } from '..';

export class Role implements IRole {
  id: string;
  constructor(public title: string,public permissions: string[] = []) {}
}
