import { IPaymentResult, IInvoice } from '.';

export interface IPayer {
  /**
   * Pay an invoice.
   * @param invoice The invoice needs be paid.
   * @param callBackUrl The payer object might need to call a url for passing result of payments
   */
  pay(invoice: IInvoice, callbackUrl?: string): Promise<IPaymentResult>;
}
