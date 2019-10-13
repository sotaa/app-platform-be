import { createConnection, ConnectionOptions } from 'typeorm';
import  { Application, Invoice, PaymentPlan, Token, User } from "../entities";

export async function initialize(config: DBConfiguration) {
 return await createConnection({
    ...config,
    logging: true,
    entities: [Application, Invoice, PaymentPlan, Token, User],
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
