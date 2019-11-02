import { IInvoice, IPaymentPlan, IUser, PaymentStatus } from '../../interfaces';

export class Invoice implements IInvoice {
  readonly createDate?: Date;
  description?: string;

  constructor(public user: IUser, public plan: IPaymentPlan, paymentStatus: PaymentStatus = PaymentStatus.incomplete) {}
}
