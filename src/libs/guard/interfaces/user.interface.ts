import { IRole } from "./role.interface";

export interface IGuardUser {
    type: string;
    roles: IRole[];
}