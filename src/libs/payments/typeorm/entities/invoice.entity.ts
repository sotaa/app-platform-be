import { EntitySchema } from "typeorm";
import { PaymentStatus, Invoice } from "../../lib";

export const InvoiceEntity = new EntitySchema<Invoice>({
    name: 'invoice',
    columns: {
        id: {
            type: Number,
            generated: 'increment',
            primary: true
        },
        createDate: {
            type: Date,
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false
        },
        payPrice: {
            type: Number,
        },
        description: {
            type: String,
            nullable: true
        },
        paymentStatus: {
            type: 'enum',
            enum: PaymentStatus
        }
    },
    relations: {
        plan: {
            type: 'many-to-one',
            eager: true,
            target: 'plan'
        },
        user: {
            type: 'many-to-one',
            target: 'user',
            eager: true,
            nullable: false,
            inverseSide: 'invoices'
        }
    }
})