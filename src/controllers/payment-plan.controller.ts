import { Controller, Route, Get, Query , Post, Body, Delete, SuccessResponse, Put } from 'tsoa';
import { IPaymentPlan, IPaymentPlanService, TYPES } from '../libs/user-directory/interfaces';
import { inject, injectable } from 'inversify';

@Route('payment-plans')
@injectable()
export class PaymentPlansController extends Controller {
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
    return await this.paymentPlanService.create(plan);
  }

  @Put('{id}')
  async update(id:number, @Body() plan: IPaymentPlan): Promise<any> {
    return this.paymentPlanService.update(id, plan);
  }
  
  @Delete('{id}')
   async delete(id: number): Promise<any> {
     return this.paymentPlanService.delete(id);
   }
}
