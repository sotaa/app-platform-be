import { UserDirectoryServer } from './user-directory.server';
import { config as envConfig } from 'dotenv-flow';

envConfig();
const env = process.env;

const config = {
  mode: env.NODE_ENV,
  port: env.PORT,
  dbConfig: {
    type: env.DB_TYPE as 'mysql' | 'mssql',
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    synchronize: eval(env.DB_SYNC)
  }
};

console.log('userDirectory started with the following configurations:', config);

const userDirectory = new UserDirectoryServer(console.log);

if (config.mode !== 'prod' && config.mode !== 'production') {
  userDirectory.enableDocumentation('/docs');
}

userDirectory.initialize(config);

userDirectory.start(config.port || 3000);

/**
 * We need to export the app for testing purposes.
 */
export default userDirectory.app;
