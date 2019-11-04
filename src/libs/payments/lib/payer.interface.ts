import { IPaymentResult, IInvoice } from "../../user-directory";
import { IPaymentMethod } from "./payment-method.interface";

export interface IPayer {
    pay(invoice: IInvoice, method: IPaymentMethod): Promise<IPaymentResult>;
}
