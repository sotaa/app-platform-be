import { IPaymentMethod } from "../../models/payment-method.model";
import { IPaymentResult } from "../../models/payment-result.model";

export interface IPaymentService {
    /**
   *
   * @param planId payment plan that want to buy.
   * @param userId id of user who want to buy the plan.
   * @param paymentMethod the method that is responsible for payment process.
   * @param callbackUrl url that is suppose to verify the payment. it is for online payment methods.
   */
    buy(planId: string, userId: string, paymentMethod: IPaymentMethod, callbackUrl?: string): Promise<IPaymentResult>;
    
    /**
   * Verifies the payment.
   * @param params callback params.
   * @param paymentMethod the payment method that is responsible for verifying the payment.
   */
    verify(params: any, paymentMethod: IPaymentMethod): Promise<IPaymentResult>;
}