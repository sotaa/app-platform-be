import { ITransaction } from '../models/transaction.model';
import { ITransactionRepository } from '../transaction-repo.interface';
import { TransactionService } from './transaction.service';

const transactions: ITransaction[] = [];

// Mock Data.
class MockTransactionRepository implements ITransactionRepository {
  save(transaction: ITransaction): Promise<ITransaction> {
    transaction.transactionKey = 'xxx';
    transactions.push(transaction);
    return Promise.resolve(transaction);
  }

  findByKey(transactionKey: string): Promise<ITransaction> {
    return Promise.resolve(transactions.find(t => t.transactionKey === transactionKey));
  }
}

let transactionService: TransactionService;
const mockRepo = describe('Transaction Service', () => {
  it('Should create', () => {
    transactionService = new TransactionService(new MockTransactionRepository());
  });
});
