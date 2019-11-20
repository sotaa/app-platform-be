import { EntitySchema } from "typeorm";
import { IPaymentResult, PaymentStatus } from "../../lib";

export const PaymentResultEntity = new EntitySchema<IPaymentResult>({
    name: 'payment-result',
    tableName: 'payment_result',
    columns: {
        status: {
            type: 'enum',
            enum: PaymentStatus,
        },
        transactionKey: {
            primary: true,
            type: String
        },
        thirdPartyData: {
            type: String
        }
    }
});