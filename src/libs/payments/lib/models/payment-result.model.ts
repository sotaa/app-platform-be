import { PaymentStatus } from "./payment-status.type";

export interface IPaymentResult {
    status: PaymentStatus;
    transactionKey: any;
}

export interface IOnlinePaymentResult extends IPaymentResult {
    completionEndpoint: string;
}
