import * as Typeorm from '../libs/user-directory/typeorm';
import { injectable } from 'inversify';


@injectable()
export class ApplicationService extends Typeorm.ApplicationService {}

@injectable()
export class PaymentPlanService extends Typeorm.PaymentPlanService {}
@injectable()
export class UserService extends Typeorm.UserService {}