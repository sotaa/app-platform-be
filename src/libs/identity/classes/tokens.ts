import { IToken, IIdentityUser, TokenType } from '../interfaces';

export class Token implements IToken{
  constructor(public type: TokenType, public value: string, public user: IIdentityUser) {}
}

export class AccessToken extends Token {
  constructor(value: string, user: IIdentityUser) {
    super(TokenType.access, value, user);
  }
}

export class RefreshToken extends Token {
  constructor(value: string, user: IIdentityUser) {
    super(TokenType.refresh, value, user);
  }
}
