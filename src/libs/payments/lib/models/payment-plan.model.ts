import { IPaymentPlan } from '../payment-plan.interface';
import { IInvoice } from '..';

export class PaymentPlan implements IPaymentPlan {
  id?: number;
  name: string;
  price: number;
  dateRange: number;
  isActive: boolean;
  description?: string;
  invoices: IInvoice[];
}
