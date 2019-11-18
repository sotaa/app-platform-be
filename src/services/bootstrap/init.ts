import { createConnection, ConnectionOptions } from 'typeorm';
import  { Application, PaymentPlan, User } from "../../libs/user-directory/typeorm";
import { IdentityUser, Token } from '../../libs/identity/typeorm';
import { InvoiceEntity, TransactionEntity } from '../../libs/payments/typeorm';

export async function initialize(config: DBConfiguration) {
 return await createConnection({
    ...config,
    logging: false,
    entities: [Application, PaymentPlan, Token, User, IdentityUser , InvoiceEntity, TransactionEntity],
    migrations: ['../migration/**/*.ts'],
    subscribers: ['../subscriber/**/*.ts']
  } as ConnectionOptions);
}

export interface DBConfiguration {
  type: 'mysql' | 'mssql';
  host: string;
  port: number | string;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}
