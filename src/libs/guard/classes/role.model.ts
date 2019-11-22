import { IRole } from '..';

export class Role implements IRole {
  constructor(public title: string,public permissions: string[] = []) {}
}
