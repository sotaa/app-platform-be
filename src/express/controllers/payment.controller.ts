import { injectable, inject } from 'inversify';
import { Request as IRequest, Response as IResponse } from 'express';
import { IIdentityUser } from '../../libs/identity/interfaces';
import { BAD_REQUEST } from 'http-status-codes';
import { IPaymentResult } from '../../libs/payments';
import { ITenant } from '../../libs/user-directory/interfaces/models/tenant.model';
import { ZarinpalPaymentMethod } from '../../libs/payments/zarinpal';
import { IPaymentService } from '../../libs/payments/lib/services/interfaces';
import { TYPES } from '../../ioc/types';

@injectable()
export class PaymentController {
  constructor(
    @inject(TYPES.ITenant) private tenant: ITenant,
    @inject(TYPES.IPaymentService) private paymentService: IPaymentService
  ) {}

  async buy(planId: string, req: IRequest, res: IResponse): Promise<IPaymentResult> {
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
      res.status(BAD_REQUEST);
      console.log(e);
      return e;
    }
  }

  public async verify(params: any): Promise<any> {
    const zPal = new ZarinpalPaymentMethod('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);
    return this.paymentService.verify(params, zPal);
  }
}
