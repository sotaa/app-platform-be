import { IPaymentPlan } from './payment-plan.interface';
import { PaymentStatus } from './models/payment-status.type';
import { IInvoiceOwner } from './invoice-owner.interface';

export interface IInvoice {
  user: IInvoiceOwner;
  plan: IPaymentPlan;
  payPrice: number;
  createDate?: Date;
  paymentStatus?: PaymentStatus;
  description?: string;
}
