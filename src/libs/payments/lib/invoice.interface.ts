import { IInvoiceOwner, IPaymentPlan, PaymentStatus } from ".";

export interface IInvoice {
  user: IInvoiceOwner;
  plan: IPaymentPlan;
  payPrice: number;
  createDate?: Date;
  paymentStatus?: PaymentStatus;
  description?: string;
}
