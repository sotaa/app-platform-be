import { IInvoice } from '../../../user-directory';
import { TransactionStatus } from './transaction.status';

export interface ITransaction {
  status: TransactionStatus;
  transactionKey: string;
  invoice: IInvoice;
}
