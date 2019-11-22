import { IOnlinePaymentResult, IPaymentResult, IInvoice } from '..';
import { IPayer } from '../payer.interface';

export interface IPaymentMethod extends IPayer{
  unPay(key: string | number): Promise<IPaymentResult>;
}

export interface IOnlinePaymentMethod extends IPaymentMethod {
  providerName: string;
  merchantId: string;
  verifyTransaction(params: any): Promise<IPaymentResult>;
  isSuccessful(params: any): boolean;
  pay(invoice: IInvoice, callBackUrl: string): Promise<IOnlinePaymentResult>;
}
