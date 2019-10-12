import { IPaymentPlan } from './payment-plan.interface';
import { IUser } from './user.interface';

export interface IInvoice {
  user: IUser;
  plan: IPaymentPlan;
  date?: object;
  isPaid?: boolean;
  authority: string;
  description?: string;
}
