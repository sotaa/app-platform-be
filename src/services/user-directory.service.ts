import * as Typeorm from '../libs/user-directory/typeorm';
import { injectable } from 'inversify';
import { TypeormPaymentPlanService } from '../libs/payments/typeorm';


@injectable()
export class ApplicationService extends Typeorm.ApplicationService {}

@injectable()
export class PaymentPlanService extends TypeormPaymentPlanService {}

@injectable()
export class UserService extends Typeorm.UserService {}