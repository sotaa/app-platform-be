import { IInvoice, IUser, IPaymentPlan } from '../../models';

export interface IInvoiceService {
    createInvoice(user: IUser , plan: IPaymentPlan): Promise<IInvoice>;
}
