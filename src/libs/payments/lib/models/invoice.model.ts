import { IInvoice, IInvoiceOwner, IPaymentPlan } from "..";
import { PaymentStatus } from ".";


export class Invoice implements IInvoice {
  id: number;
  readonly createDate?: Date;
  description?: string;

  constructor(public user: IInvoiceOwner, public plan: IPaymentPlan,public paymentStatus: PaymentStatus = PaymentStatus.incomplete, public payPrice: number = plan.price) {}
}
