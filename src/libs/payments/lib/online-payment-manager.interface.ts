import { IInvoice, IPaymentResult } from '../../user-directory';
import { IOnlinePaymentResult, IPayer, IOnlinePaymentMethod } from '.';

export interface IOnlinePaymentManager extends IPayer {
  pay(invoice: IInvoice, method: IOnlinePaymentMethod): Promise<IOnlinePaymentResult>;
  verify(params: any, method: IOnlinePaymentMethod): Promise<IPaymentResult>;
}

export class OnlinePaymentManager implements IOnlinePaymentManager {

  async pay(invoice: IInvoice, method: IOnlinePaymentMethod): Promise<IOnlinePaymentResult> {
    const transaction = await method.createTransaction(invoice.plan.price, {invoice});
    return transaction;
  }
  
  verify(params: any, method: IOnlinePaymentMethod): Promise<IPaymentResult> {
    return method.verifyTransaction(params);
  }
}
