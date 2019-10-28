import { createConnection, ConnectionOptions } from 'typeorm';
import  { Application, Invoice, PaymentPlan, User, Token } from "../entities";
import { IdentityUser } from '../../../identity/typeorm/entities';

export async function initialize(config: DBConfiguration) {
 return await createConnection({
    ...config,
    logging: false,
    entities: [Application, Invoice, PaymentPlan, Token, User, IdentityUser],
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
