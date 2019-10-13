import { Controller, Route, Get, Query , Request, Post, Body, Delete } from 'tsoa';
import { IPaymentPlan, IPaymentPlanService, TYPES } from '../libs/user-directory/interfaces';
import { inject, injectable } from 'inversify';

@Route('payment-plans')
@injectable()
export class PaymentPlanController extends Controller {
  constructor(@inject(TYPES.IPaymentPlanService) private paymentPlanService: IPaymentPlanService) {
      super();
  }
  
  @Get()
  async list(@Query() filter?: any): Promise<IPaymentPlan[]> {
    return this.paymentPlanService.find(filter);
  }

  @Get('{id}')
  async find(id: number): Promise<IPaymentPlan> {
    return this.paymentPlanService.findById(id);
  }
  
  @Post()
  async create(@Body() plan: IPaymentPlan): Promise<IPaymentPlan> {
    return this.paymentPlanService.create(plan);
  }
  
  @Delete('{id}')
   async delete(id: number): Promise<any> {
     return this.paymentPlanService.delete(id);
   }
}
