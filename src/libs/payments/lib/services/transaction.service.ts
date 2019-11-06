import { ITransactionService } from './interfaces/transaction-service.interface';
import { ITransaction } from '..';
import { ITransactionRepository } from '../transaction-repo.interface';

export class TransactionService implements ITransactionService {
  constructor(private repo: ITransactionRepository) {}
  save(transaction: ITransaction): Promise<ITransaction> {
   return this.repo.save(transaction);
  }
}
