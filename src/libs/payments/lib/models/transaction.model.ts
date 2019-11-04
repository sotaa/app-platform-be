import { IInvoice } from '../../../user-directory';

export interface ITransaction {
  transactionKey: string;
  invoice: IInvoice;
}
