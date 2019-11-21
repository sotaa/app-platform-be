import { IInvoice } from './invoice.interface';
import { IUser } from '../../user-directory';

// IInvoiceOwner is extending IUser because the PaymentService is coupled
// with IUser which means it is not implement correctly and needs to be refactored.
// after refactoring the PaymentService IUser extension should be removed.

export interface IInvoiceOwner extends IUser {
  id: string;
  invoices: IInvoice[];
}
