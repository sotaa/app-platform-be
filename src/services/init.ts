import { initialize, DBConfiguration } from './bootstrap';

export const initializeDatabase = (config: DBConfiguration) => {
   return initialize(config);
};

export type DBConfiguration = DBConfiguration;
