import { EntitySchema } from "typeorm";
import { Transaction, TransactionStatus } from "../../lib";

export const TransactionEntity = new EntitySchema<Transaction>({
    name: 'transaction',
    columns: {
        transactionKey: {
            type: String,
            nullable: false,
            primary: true,
            unique: true
        },
        status: {
            type: 'enum',
            enum: TransactionStatus,
            nullable: false
        }
    },
    relations: {
        invoice: {
            type: 'many-to-one',
            target: 'invoice',
            nullable: false,
            eager: true
        }
    }
    
})