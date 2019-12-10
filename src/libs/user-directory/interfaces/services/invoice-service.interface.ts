import { IUser } from '../models';
import { IPaymentPlan, IInvoice } from '../../../payments';

export interface IInvoiceService {
    createInvoice(user: IUser , plan: IPaymentPlan): Promise<IInvoice>;
}
