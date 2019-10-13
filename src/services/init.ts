import { DBConfiguration , initialize } from '../libs/user-directory/typeorm';

export const initializeDatabase = async (config: DBConfiguration) => {
    await initialize(config);
};

export type DBConfiguration = DBConfiguration;