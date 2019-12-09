import { initialize, DBConfiguration } from './bootstrap';
import { seedDB } from './bootstrap/seeder';

export const initializeDatabase = (config: DBConfiguration) => {
   return initialize(config);
};

export type DBConfiguration = DBConfiguration;
