import { IPaymentResult } from '../../user-directory';
import { IOnlinePaymentResult } from '.';

export interface IPaymentMethod {}

export interface IOnlinePaymentMethod extends IPaymentMethod {
  providerName: string;
  merchantId: string;
  createTransaction(amount: number, additionalData?: any): Promise<IOnlinePaymentResult>;
  verifyTransaction(params: any): Promise<IPaymentResult>;
}
