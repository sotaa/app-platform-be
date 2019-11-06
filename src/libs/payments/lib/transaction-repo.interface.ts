import { ITransaction } from '.';

export interface ITransactionRepository extends ITransactionSaver, ITransactionFinder {}

export interface ITransactionSaver {
  save(transaction: ITransaction): Promise<ITransaction>;
}

export interface ITransactionFinder {
  findByKey(transactionKey: string): Promise<ITransaction>;
}
