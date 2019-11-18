import { initialize, DBConfiguration } from "./bootstrap";


export const initializeDatabase = async (config: DBConfiguration) => {
    await initialize(config);
    
};

export type DBConfiguration = DBConfiguration;