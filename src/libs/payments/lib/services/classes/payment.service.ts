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
   * Buy functionality for a user who want to buy a product.
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
    const plan = await this.loadPlan(planId);
    const udUser = await this.loadUser(userId);

    const invoice = new Invoice(udUser, plan);
    const transaction = new Transaction(invoice, TransactionStatus.pending);

    if (callbackUrl) {
      callbackUrl += callbackUrl + '?transactionKey=' + transaction.transactionKey;
    }

    let paymentResult = await paymentMethod.pay(invoice, callbackUrl);

    if (paymentResult.status === PaymentStatus.paid) {
      invoice.paymentStatus = PaymentStatus.paid;
    }

    try {
      await this.manager.transaction(async tManager => {
        await tManager.save(invoice);
        await tManager.save(transaction);
      });
    } catch (e) {
      paymentResult = await paymentMethod.unPay(paymentResult.transactionKey);
      throw new Error(`DATABASE_SAVING_FAILURE`);
    }

    return paymentResult;
  }

  /**
   * Verifies the payment.
   * @param params callback params.
   * @param paymentMethod the payment method that is responsible for verifying the payment.
   */
  async verify(params: any, paymentMethod: IOnlinePaymentMethod): Promise<IPaymentResult> {
    const transaction = await this.loadTransaction(params.transactionKey);

    /**
     * handle transaction failure.
     */
    if (!paymentMethod.isSuccessful(params)) {
      transaction.status = TransactionStatus.failed;
      await this.manager.save(transaction);
      throw new Error('PAYMENT_FAILURE');
    }

    // update invoice status.
    transaction.status = TransactionStatus.successful;
    transaction.invoice.paymentStatus = PaymentStatus.paid;

    // commit the transaction in bank.
    let verifyResult = await paymentMethod.verifyTransaction(params);
    // didn't use await because it is not necessary to wait for result of this operation.
    this.manager.save(verifyResult);

    try {
      await this.manager.transaction(async tManager => {
        await tManager.save(transaction);
        await tManager.save(Invoice);
      });
    } catch (e) {
      verifyResult = await paymentMethod.unPay(params.transactionKey);
      throw new Error(`DATABASE_SAVING_FAILURE`);
    }

    return verifyResult;
  }

  /**
   * load plan from DB.
   * @param planId Plan id
   */
  private async loadPlan(planId: string) {
    const plan = await this.manager.findOne(PaymentPlan, planId);

    if (!plan) {
      throw new Error('INVALID_PLAN_ID') as any;
    }
    return plan;
  }

  /**
   * load user from db.
   * @param userId
   */
  private async loadUser(userId: string) {
    const udUser = await this.manager.findOne(User, userId);

    if (!udUser) {
      throw new Error('USER_NOT_FOUND');
    }
    return udUser;
  }

  /**
   * loads the transaction from DB with transaction key.
   * @param key transaction key.
   */
  private async loadTransaction(key: any) {
    const transaction = await this.manager.findOne<ITransaction>(key);
    if (!transaction) {
      throw new Error('TRANSACTION_KEY_NOT_FOUND');
    }

    return transaction;
  }
}
