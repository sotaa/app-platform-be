import { IToken } from "./token.interface";

export interface IUser {
    name: string;
    email: string;
    password: string;
    mobile: string;
    tokens: IToken[];
    expireDate?: Date;
    registerDate: Date;
}