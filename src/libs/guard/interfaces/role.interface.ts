import { IGuardUser } from "./user.interface";

export interface IRole {
  title: string;
  permissions: string[];
  users?: IGuardUser[];
  parent?: IRole;
  children?: IRole[];
}
