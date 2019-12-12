import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';
import { IPaymentPlan, IPaymentPlanService } from '../../libs/payments';

@injectable()
export class PaymentPlansController {
  constructor(@inject(TYPES.IPaymentPlanService) private paymentPlanService: IPaymentPlanService) {}
  
  // TODO: this method should return just active plans for none admin users.
  async list(filter?: any): Promise<IPaymentPlan[]> {
    return this.paymentPlanService.find(filter);
  }

  /** the methods down below should be forbidden for none admin users. */
  async find(id: number): Promise<IPaymentPlan> {
    return this.paymentPlanService.findById(id);
  }
  
  async create(plan: IPaymentPlan): Promise<IPaymentPlan> {
    return await this.paymentPlanService.create(plan);
  }
  
  async update(id:number, plan: IPaymentPlan): Promise<any> {
    return this.paymentPlanService.update(id, plan);
  }
  
   async delete(id: number): Promise<any> {
     return this.paymentPlanService.delete(id);
   }
}
