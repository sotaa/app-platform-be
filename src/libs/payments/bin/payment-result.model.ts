import { PaymentStatus } from "./payment-status.type";

export interface IPaymentResult {
    status: PaymentStatus;
}

export interface IOnlinePaymentResult extends IPaymentResult {
    completionEndpoint: string;
}
