import { ITransaction } from "../../models/transaction.model";

export interface ITransactionService {
    findByKey(transactionKey: string): Promise<ITransaction>;
    save(transaction: ITransaction): Promise<ITransaction>;
}