import { ITransaction } from "../../models/transaction.model";

export interface ITransactionRepository {
    findByKey(transactionKey: string): Promise<ITransaction>;
    save(transaction: ITransaction): Promise<ITransaction>;
}