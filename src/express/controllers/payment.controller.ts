import { Controller, Route, Request, Post, Get, Query, SuccessResponse } from 'tsoa';
import { injectable, inject } from 'inversify';
import { IInvoiceService, TYPES, IPaymentPlanService, IUserService, PaymentStatus } from '../../libs/user-directory';
import { Request as IRequest, Response as IResponse } from 'express';
import { IIdentityUser } from '../../libs/identity/interfaces';
import { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } from 'http-status-codes';
import { IPaymentResult, ITransaction, TransactionStatus } from '../../libs/payments';
import { ITenant } from '../../libs/user-directory/interfaces/models/tenant.model';
import { ZarinpalPaymentMethod } from '../../libs/payments/zarinpal';
import { ITransactionService } from '../../libs/payments/lib/services/interfaces/transaction-service.interface';

@Route('payment')
@injectable()
export class PaymentController extends Controller {
  constructor(
    private invoiceService: IInvoiceService,
    private tenant: ITenant,
    private transactionService: ITransactionService,
    @inject(TYPES.IPaymentPlanService) private planService: IPaymentPlanService,
    @inject(TYPES.IUserService) private userService: IUserService
  ) {
    super();
  }

  @Route('buy/{planId}')
  @Post()
  async buy(planId: string, @Request() req: IRequest): Promise<IPaymentResult> {
    const plan = await this.planService.findById(planId);

    if (!plan) {
      this.setStatus(BAD_REQUEST);
      return new Error('INVALID_PLAN_ID') as any;
    }

    const idUser = (req as any).user as IIdentityUser;
    const udUser = await this.userService.findById(idUser.id);

    if (!udUser) {
      this.setStatus(UNAUTHORIZED);
      return new Error('USER_IS_CORRUPTED') as any;
    }

    const invoice = await this.invoiceService.createInvoice(udUser, plan);
    const zPal = new ZarinpalPaymentMethod('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
    // TODO: save transaction to DB.
    // TODO: add proper callback url with transactionId.
    return await zPal.pay(invoice, 'CALLBACK_URL');
  }

  @Get('verify/{transactionKey}')
  @SuccessResponse(302, 'Redirect')
  public async verify(transactionKey: string, @Query() params: any, @Request() req: IRequest) {
    const transaction = await this.transactionService.findByKey(transactionKey);
    if (!transaction) {
      this.setStatus(NOT_FOUND);
      return new Error('TRANSACTION_KEY_NOT_FOUND');
    }

    const zPal = new ZarinpalPaymentMethod('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
    /**
     * handle transaction failure.
     */
    if (!zPal.isSuccessful(params)) {
      transaction.status = TransactionStatus.failed;
      await this.transactionService.save(transaction);
      // TODO: it should throw an error after it moved to it's own folder.
      return req.res.redirect(this.tenant.failedPaymentPage);
    }

    // upgrade the user. and change transaction status to success.
    transaction.status = TransactionStatus.successful;
    transaction.invoice.paymentStatus = PaymentStatus.paid;
    // update invoice status.
    const user = transaction.invoice.user;
    // TODO: increase user's expire date.

    this.transactionService.save(transaction);
    // TODO: save the invoice.
    
    // commit the transaction in bank.
    const veriResult = await zPal.verifyTransaction(params);
    // TODO: save verifyResult.

    req.res.redirect(this.tenant.successPaymentPage);
  }
}
