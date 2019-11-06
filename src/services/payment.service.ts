import { TypeormPaymentService } from '../libs/payments/typeorm';
import { injectable } from 'inversify';

@injectable()
export class PaymentService extends TypeormPaymentService {}
