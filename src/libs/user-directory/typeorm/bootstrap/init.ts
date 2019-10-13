import { createConnection, ConnectionOptions } from "typeorm";

export function init(config: IConfiguration) {
    createConnection(config as ConnectionOptions);
}

export interface IConfiguration {
  type: 'mysql' | 'mssql';
  host: string;
  port: number | string;
  username: string;
  password: string;
  database: string;
}
