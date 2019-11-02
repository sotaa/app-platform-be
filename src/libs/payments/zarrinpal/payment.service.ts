import { IOnlinePaymentMethod, IPaymentResult, IOnlinePaymentResult, PaymentStatus } from '../bin';

const zPal = require('zarinpal-checkout');

export class ZarinpalPaymentMethod implements IOnlinePaymentMethod {
  readonly providerName = 'ZarinPal';
  zPalClient: any;
  constructor(public readonly merchantId: string, sandbox: boolean) {
    this.zPalClient = zPal.create(merchantId, sandbox);
  }

  async createTransaction(
    amount: number,
    transactionData: { description?: string; user?: { email: string }; callbackUrl: string }
  ): Promise<IOnlinePaymentResult> {

    const zPalTransaction = await this.zPalClient.PaymentRequest({
      Amount: amount,
      CallbackURL: transactionData.callbackUrl,
      Description: transactionData.description
    });

    if (zPalTransaction.status === 100) {
      return { completionEndpoint: zPalTransaction.url, status: PaymentStatus.incomplete };
    }
      return { completionEndpoint: undefined, status: PaymentStatus.failed };
    
  }

  verifyTransaction(params: { Status: string; Authority: string }): Promise<IPaymentResult> {
    throw new Error('Method not implemented.');
  }
}
