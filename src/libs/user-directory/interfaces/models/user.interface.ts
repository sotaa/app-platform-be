import { IInvoice } from '../../../payments/lib/invoice.interface';
import { IGuardUser } from '../../../guard';

export interface IUserBO {
  upgrade(days: number): IUserBO;
}

export interface IUserDTO {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  sex?: 'male' | 'female';
  mobile?: string;
  expireDate?: Date;
  registerDate?: Date;
  invoices?: IInvoice[];
}

export interface IUser extends IUserBO , IUserDTO, IGuardUser {}