import { IToken } from '../../../identity/interfaces/models/token.interface';

export interface IUser {
  firstName?: string;
  lastName?: string;
  sex?: 'male' | 'female';
  mobile?: string;
  expireDate?: Date;
  registerDate: Date;
}
