import { createConnection, ConnectionOptions } from 'typeorm';
import { IdentityUserEntity, TokenEntity } from '../../libs/identity/typeorm';
import { InvoiceEntity, TransactionEntity, PaymentPlanEntity } from '../../libs/payments/typeorm';
import { UserEntity, ApplicationEntity } from '../../libs/user-directory/typeorm';
import { PaymentResultEntity } from '../../libs/payments/typeorm/entities/payment-result.entity';

export async function initialize(config: DBConfiguration) {
  return await createConnection({
    ...config,
    logging: false,
    entities: [TokenEntity, IdentityUserEntity, UserEntity, ApplicationEntity , PaymentResultEntity, PaymentPlanEntity, InvoiceEntity, TransactionEntity],
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
