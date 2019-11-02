import { IInvoice, IUser, IPaymentPlan } from '../../models';
import { IPaymentResult } from '../../models/payment-result.interface';

export interface IInvoiceService {
    createInvoice(user: IUser , plan: IPaymentPlan): Promise<IInvoice>;
}
