import { IPaymentService } from '../interfaces/payment.service.interface';
import { IPaymentMethod, IPaymentResult, PaymentStatus } from '../..';
import { EntityManager } from 'typeorm';
import { PaymentPlan, User } from '../../../../user-directory/typeorm';
import { Transaction, ITransaction } from '../../models/transaction.model';
import { TransactionStatus } from '../../models/transaction.status';
import { Invoice } from '../../../../user-directory/classes/invoice';
import { IOnlinePaymentMethod } from '../../models/payment-method.model';

export class PaymentService implements IPaymentService {
  constructor(private manager: EntityManager) {}

  /**
   *
   * @param planId payment plan that want to buy.
   * @param userId id of user who want to buy the plan.
   * @param paymentMethod the method that is responsible for payment process.
   * @param callbackUrl url that is suppose to verify the payment. it is for online payment methods.
   */
  async buy(
    planId: string,
    userId: string,
    paymentMethod: IPaymentMethod,
    callbackUrl?: string
  ): Promise<IPaymentResult> {
    const plan = await this.manager.findOne(PaymentPlan, planId);

    if (!plan) {
      throw new Error('INVALID_PLAN_ID') as any;
    }

    const udUser = await this.manager.findOne(User, userId);

    if (!udUser) {
      throw new Error('USER_NOT_FOUND');
    }

    const invoice = new Invoice(udUser, plan);
    const transaction = new Transaction(invoice, TransactionStatus.pending);

    try {
      await this.manager.transaction(async tManager => {
        tManager.save(invoice);
        tManager.save(transaction);
      });
    } catch(e) {
      console.log(e);
      throw new Error(`DATABASE_SAVING_FAILURE`);
    }

    if (callbackUrl) {
      callbackUrl += callbackUrl + '?transactionKey=' + transaction.transactionKey;
    }
    return await paymentMethod.pay(invoice, callbackUrl);
  }

  /**
   * Verifies the payment.
   * @param params callback params.
   * @param paymentMethod the payment method that is responsible for verifying the payment.
   */
  async verify(params: any, paymentMethod: IOnlinePaymentMethod): Promise<IPaymentResult> {
    const transaction = await this.manager.findOne<ITransaction>(params.transactionKey);
    if (!transaction) {
      throw new Error('TRANSACTION_KEY_NOT_FOUND');
    }

    /**
     * handle transaction failure.
     */
    if (!paymentMethod.isSuccessful(params)) {
      transaction.status = TransactionStatus.failed;
      await this.manager.save(transaction);
      throw new Error('PAYMENT_FAILURE');
    }

    // upgrade the user. and change transaction status to success.
    const user = transaction.invoice.user;
    // TODO: increase user's expire date.

    // update invoice status.
    transaction.status = TransactionStatus.successful;
    transaction.invoice.paymentStatus = PaymentStatus.paid;

    this.manager.transaction(async tManager => {
       await tManager.save(transaction);
       await tManager.save(Invoice);
    });

    // commit the transaction in bank.
    const verifyResult = await paymentMethod.verifyTransaction(params);
    this.manager.save(verifyResult);   
    return verifyResult;
}
}
