import { Controller, Route, Request, Post, Get, SuccessResponse } from 'tsoa';
import { injectable, inject } from 'inversify';
import { Request as IRequest } from 'express';
import { IIdentityUser } from '../../libs/identity/interfaces';
import { BAD_REQUEST } from 'http-status-codes';
import { IPaymentResult } from '../../libs/payments';
import { ITenant } from '../../libs/user-directory/interfaces/models/tenant.model';
import { ZarinpalPaymentMethod } from '../../libs/payments/zarinpal';
import { IPaymentService } from '../../libs/payments/lib/services/interfaces';
import { TYPES } from '../../ioc/types';

@Route('payment')
@injectable()
export class PaymentController extends Controller {
  constructor(
    @inject(TYPES.ITenant) private tenant: ITenant,
    @inject(TYPES.IPaymentService) private paymentService: IPaymentService
  ) {
    super();
  }

  @Post('buy/{planId}')
  async buy(planId: string, @Request() req: IRequest): Promise<IPaymentResult> {
    const verifyUrl = req.protocol.concat(
      '://',
      req.hostname.concat(req.hostname === 'localhost' ? ':3000' : ''),
      '/payment/verify'
    );

    const zPal = new ZarinpalPaymentMethod('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
    const idUser = (req as any).user.user as IIdentityUser;
    try {
      return await this.paymentService.buy(planId, idUser.id.toString(), zPal, verifyUrl);
    } catch (e) {
      console.log(e);
      this.setStatus(BAD_REQUEST);
      return e;
    }
  }

  @Get('verify')
  @SuccessResponse(302, 'Redirect')
  public async verify(@Request() req: IRequest): Promise<any> {
    const params = req.query;
    const zPal = new ZarinpalPaymentMethod('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
    try {
      await this.paymentService.verify(params, zPal);
      req.res.redirect(this.tenant.successPaymentPage);
    } catch (e) {
      this.setStatus(BAD_REQUEST);
      console.log(e);
      req.res.redirect(this.tenant.failedPaymentPage);
    }
  }
}
