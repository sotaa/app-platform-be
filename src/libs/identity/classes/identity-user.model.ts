import { IToken, IIdentityUser } from '../interfaces';

export class IdentityUser implements IIdentityUser {
  id?: string;
  tokens: IToken[];

  constructor(public username: string, public password: string) {}
}
