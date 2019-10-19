import { TYPES } from '../../libs/user-directory/interfaces';
import { Container, inject, injectable } from 'inversify';
import {
  ApplicationService,
  InvoiceService,
  PaymentPlanService,
  TokenService,
  UserService
} from '../../services';

import { PaymentPlansController, ApplicationController } from '../../controllers';

const iocContainer = new Container({skipBaseClassChecks: true});

iocContainer.bind(TYPES.IApplicationService).to(ApplicationService).inSingletonScope();
iocContainer.bind(TYPES.IInvoiceService).to(InvoiceService).inSingletonScope();
iocContainer.bind(TYPES.IPaymentPlanService).to(PaymentPlanService).inSingletonScope();
iocContainer.bind(TYPES.ITokenService).to(TokenService).inSingletonScope();
iocContainer.bind(TYPES.IUserService).to(UserService).inSingletonScope();

iocContainer.bind(PaymentPlansController).toSelf().inSingletonScope();
iocContainer.bind(ApplicationController).toSelf().inSingletonScope();

export { iocContainer, inject, injectable };
