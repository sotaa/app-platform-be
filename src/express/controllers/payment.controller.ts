import { Controller, Route, Request, Post, Response, Get, Query, SuccessResponse } from 'tsoa';
import { injectable, inject } from 'inversify';
import { IInvoiceService, IUserService, TYPES, IPaymentPlanService, PaymentStatus } from '../../libs/user-directory';
import { Request as IRequest, Response as IResponse } from 'express';
import { IIdentityUser } from '../../libs/identity/interfaces';
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';
import { IPaymentResult } from '../../libs/payments';
import { ITenant } from '../../libs/user-directory/interfaces/models/tenant.model';
import { IOnlinePaymentManager } from '../../libs/payments/lib/online-payment-manager.interface';
import { ZarinpalPaymentMethod } from '../../libs/payments/zarinpal';

@Route('payment')
@injectable()
export class PaymentController extends Controller {
  constructor(
    private invoiceService: IInvoiceService,
    private tenant: ITenant,
    private paymentManager: IOnlinePaymentManager,
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
    return await this.paymentManager.pay(invoice,zPal);
  }

  @Get()
  @SuccessResponse(302, 'Redirect')
  public async verify(@Query() params: any, @Request() req: IRequest) {

    const zPal = new ZarinpalPaymentMethod('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
    
    const paymentResult = await this.paymentManager.verify(params, zPal);
    // if paymentResult is successful. 
      // upgrade the user. and change transaction status to success.
      // commit the transaction in bank.
      
    if (paymentResult.status === PaymentStatus.successful) {
      req.res.redirect(this.tenant.successPaymentPage);
    } else {
      req.res.redirect(this.tenant.failedPaymentPage);
    }
  }
}
