import { IToken, IIdentityUser, TokenType } from '../interfaces';
import { Token } from '../typeorm/entities';


export class AccessToken extends Token {
  constructor(value: string, user: IIdentityUser) {
    super();
    this.type = TokenType.access;
    this.value = value;
    this.user = user;
  }
}

export class RefreshToken extends Token {
  constructor(value: string, user: IIdentityUser) {
    super();
    this.type = TokenType.refresh;
    this.value = value;
    this.user = user;
  }
}
