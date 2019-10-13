import { CRUDService } from './crud.service';
import { PaymentPlan } from '../entities';
import { IPaymentPlanService } from '../../interfaces';
import { getRepository } from 'typeorm';

export class PaymentPlanService extends CRUDService<PaymentPlan> implements IPaymentPlanService {
    constructor() {
        super(getRepository(PaymentPlan));
    }
}
