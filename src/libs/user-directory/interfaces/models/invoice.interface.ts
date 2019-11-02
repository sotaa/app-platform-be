import { IPaymentPlan } from './payment-plan.interface';
import { IUser } from './user.interface';
import { PaymentStatus } from '../../../payments/bin/payment-status.type';

export interface IInvoice {
  user: IUser;
  plan: IPaymentPlan;
  createDate?: Date;
  paymentStatus?: PaymentStatus;
  description?: string;
}
