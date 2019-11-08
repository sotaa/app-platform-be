import { IInvoice, IPaymentPlan, IUser, IUserDTO } from '../../interfaces';
import { PaymentStatus } from '../../../payments';

export class Invoice implements IInvoice {
  readonly createDate?: Date;
  description?: string;

  constructor(public user: IUser, public plan: IPaymentPlan,public paymentStatus: PaymentStatus = PaymentStatus.incomplete, public payPrice: number = plan.price) {}
}
