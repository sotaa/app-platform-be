import { PaymentStatus } from './payment-status.type';

export interface IPaymentResult {
  status: PaymentStatus;
  transactionKey: any;
  thirdPartyData?: string;
}

export interface IOnlinePaymentResult extends IPaymentResult {
  completionEndpoint: string;
}
