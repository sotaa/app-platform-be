import { IPaymentPlan, IPaymentPlanService } from "../..";
import { Repository } from "typeorm";

export abstract class PaymentPlanService implements IPaymentPlanService {
    constructor(protected repository: Repository<IPaymentPlan>) {}
    create(entity: IPaymentPlan): Promise<IPaymentPlan> {
      return this.repository.save(entity);
    }
  
    save(entity: IPaymentPlan): Promise<IPaymentPlan>{
      return this.repository.save<IPaymentPlan>(entity);
    }
  
    update(condition: number | object | Partial<IPaymentPlan>, entity: IPaymentPlan) {
      return this.repository.update(condition as Partial<IPaymentPlan>, entity);
    }
  
    delete(id: number | number[] | object | Partial<IPaymentPlan>): Promise<any> {
      return this.repository.delete(id as Partial<IPaymentPlan>);
    }
    find(condition?: object): Promise<IPaymentPlan[]> {
      return this.repository.find(condition);
    }
    findById(id: number): Promise<IPaymentPlan> {
      return this.repository.findOne(id);
    }
  
    findByIds(ids: number[]) {
        return this.repository.findByIds(ids);
    }
  }
  