import { CRUDService } from './crud.service';

import { IPaymentPlanService } from '../../interfaces';
import { getRepository } from 'typeorm';
import { PaymentPlanEntity } from '../entities';
import { PaymentPlan } from '../../classes/models';

export class PaymentPlanService extends CRUDService<PaymentPlan> implements IPaymentPlanService {
    constructor() {
        super(getRepository(PaymentPlanEntity));
    }
}
