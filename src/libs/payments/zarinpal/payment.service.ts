import { IOnlinePaymentMethod, IPaymentResult, IOnlinePaymentResult, PaymentStatus, IInvoice } from '../lib';

const zPal = require('zarinpal-checkout');

export class ZarinpalPaymentMethod implements IOnlinePaymentMethod {
  readonly providerName = 'ZarinPal';
  zPalClient: any;

  constructor(public readonly merchantId: string, isSandbox: boolean) {
    this.zPalClient = zPal.create(merchantId, isSandbox);
  }
  async pay(invoice: IInvoice, callbackUrl: string): Promise<IOnlinePaymentResult> {
    const zPalTransaction = await this.createTransaction(invoice.payPrice, {
      user: invoice.user,
      callbackUrl,
      description: 'Test description'
    });

    if (zPalTransaction.status === 100) {
      return {
        completionEndpoint: zPalTransaction.url,
        transactionKey: zPalTransaction.authority,
        status: PaymentStatus.incomplete
      };
    }
    throw new Error('Cannot create transaction in zarinpal service');
  }

  isSuccessful(params: any): boolean {
    return params.Status === 'OK';
  }

  createTransaction(
    amount: number,
    transactionData: { description: string; user?: { email: string }; callbackUrl: string }
  ) {
    return this.zPalClient.PaymentRequest({
      Amount: amount,
      CallbackURL: transactionData.callbackUrl,
      Description: transactionData.description
    });
  }

  async verifyTransaction(params: { amount: number; Status: string; Authority: string }): Promise<IPaymentResult> {
    const verificationResult = await this.zPalClient.PaymentVerification({
      Amount: params.amount,
      Authority: params.Authority
    });

    if (verificationResult.status === -21) {
      throw new Error('Can not verify payment in zarinpal.');
    }
    return { status: PaymentStatus.paid, transactionKey: params.Authority };
  }

  async unPay(authority: string): Promise<IPaymentResult> {
    return { status: PaymentStatus.incomplete, transactionKey: authority };
  }
}
