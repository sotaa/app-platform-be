import { PaymentStatus, IPaymentPlan, IInvoice } from '../..';
import { IInvoiceOwner } from '../invoice-owner.interface';

export class Invoice implements IInvoice {
  id: number;
  readonly createDate?: Date;
  description?: string;

  constructor(public user: IInvoiceOwner, public plan: IPaymentPlan,public paymentStatus: PaymentStatus = PaymentStatus.incomplete, public payPrice: number = plan.price) {}
}
