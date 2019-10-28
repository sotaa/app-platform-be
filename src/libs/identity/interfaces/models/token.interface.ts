import { IIdentityUser } from './identity-user.interface';

export interface IToken {
  user: IIdentityUser;
  type: TokenType;
  value: string;
}

export enum TokenType {
  access = 10,
  refresh = 20
}

export interface ITokenPair {
  token: string;
  refreshToken: string;
}
