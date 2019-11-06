import { PaymentService } from '../lib';
import { getManager } from 'typeorm';

export class TypeormPaymentService extends PaymentService {
    constructor()  {
        super(getManager());
    }
}
