import { IOnlinePaymentMethod, IPaymentResult, IOnlinePaymentResult, PaymentStatus } from '../lib';
import { IInvoice } from '../../user-directory';

const zPal = require('zarinpal-checkout');

export class ZarinpalPaymentMethod implements IOnlinePaymentMethod {

  readonly providerName = 'ZarinPal';
  zPalClient: any;
  
  constructor(public readonly merchantId: string, sandbox: boolean) {
    this.zPalClient = zPal.create(merchantId, sandbox);
  }
  async pay(invoice: IInvoice, callbackUrl: string): Promise<IOnlinePaymentResult> {
    const zPalTransaction = await this.createTransaction(invoice.payPrice , { user: invoice.user , callbackUrl});

    if (zPalTransaction.status === 100) {
      return { completionEndpoint: zPalTransaction.url, transactionKey: zPalTransaction.Authority , status: PaymentStatus.incomplete };
    }
      throw new Error('Cannot create transaction in zarinpal service');
  }

  isSuccessful(params: any): boolean {
    return params.Status === 'OK';
  }

  createTransaction(
    amount: number,
    transactionData: { description?: string; user?: { email: string }; callbackUrl: string }
  ) {

    return this.zPalClient.PaymentRequest({
      Amount: amount,
      CallbackURL: transactionData.callbackUrl,
      Description: transactionData.description
    });
  }

  verifyTransaction(params: { Status: string; Authority: string }): Promise<IPaymentResult> {
    throw new Error('Method not implemented.');
  }

  unPay(authority: string): Promise<IPaymentResult> {
    throw new Error('Method not implemented.');
  }
}
