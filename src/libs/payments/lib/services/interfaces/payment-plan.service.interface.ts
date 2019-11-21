import { IPaymentPlan } from "../..";

export interface IPaymentPlanService {
    create(entity: IPaymentPlan) : Promise<IPaymentPlan>;
    save(entity: IPaymentPlan): Promise<IPaymentPlan>;
    /**
     * update the entity with specific id or condition.
     * @param condition object id or an object that represent the condition.
     * @param entity the values needed to be updated.
     */
    update(condition: number | string | Partial<IPaymentPlan>, entity: Partial<IPaymentPlan>) : Promise<any>;
    delete(id: number | string | number[] | string[] | Partial<IPaymentPlan>): Promise<any>;
    find(condition?: object): Promise<IPaymentPlan[]>;
    findById(id: number | string):Promise<IPaymentPlan>;
    findByIds(ids: number[] | string[]): Promise<IPaymentPlan[]>;
}