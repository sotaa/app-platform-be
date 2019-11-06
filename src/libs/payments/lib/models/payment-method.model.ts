import { IPaymentResult, IInvoice } from '../../../user-directory';
import { IOnlinePaymentResult } from '..';
import { IPayer } from '../payer.interface';

export interface IPaymentMethod extends IPayer{}

export interface IOnlinePaymentMethod extends IPaymentMethod {
  providerName: string;
  merchantId: string;
  verifyTransaction(params: any): Promise<IPaymentResult>;
  isSuccessful(params: any): boolean;
  pay(invoice: IInvoice, callBackUrl: string): Promise<IOnlinePaymentResult>;
}
