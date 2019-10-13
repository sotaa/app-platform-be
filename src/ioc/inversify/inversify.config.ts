import { TYPES } from '../../libs/user-directory/interfaces';
import { Container, inject, injectable } from 'inversify';
import {
  ApplicationService,
  InvoiceService,
  PaymentPlanService,
  TokenService,
  UserService
} from '../../services/user-directory.service';

import { PaymentPlanController } from '../../controllers';

const iocContainer = new Container({skipBaseClassChecks: true});

iocContainer.bind(TYPES.IApplicationService).to(ApplicationService);
iocContainer.bind(TYPES.IInvoiceService).to(InvoiceService);
iocContainer.bind(TYPES.IPaymentPlanService).to(PaymentPlanService);
iocContainer.bind(TYPES.ITokenService).to(TokenService);
iocContainer.bind(TYPES.IUserService).to(UserService);

iocContainer.bind(PaymentPlanController).to(PaymentPlanController);

export { iocContainer, inject, injectable };
