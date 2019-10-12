import { IUser } from "./user.interface";

export interface IToken {
    user: IUser;
  type: TokenType;
  value: string;
}
export enum TokenType {
  auth = 10
}
