import { getRepository } from "typeorm";
import { IPaymentPlan, PaymentPlanService } from "../lib";

export class TypeormPaymentPlanService extends PaymentPlanService {
    constructor() {
        super(getRepository<IPaymentPlan>('plan'));
    }
}