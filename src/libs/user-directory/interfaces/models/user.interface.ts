import { IToken } from '../../../identity/interfaces/models/token.interface';
import { IInvoice } from './invoice.interface';

export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  sex?: 'male' | 'female';
  mobile?: string;
  expireDate?: Date;
  registerDate: Date;
  invoices: IInvoice[];
}
