import {v4} from 'uuid';

export class TransactionKeyGenerator {
  static  generate() {
        return v4();
    }
}
