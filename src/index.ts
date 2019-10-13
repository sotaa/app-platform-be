import { UserDirectoryServer } from './user-directory.server';
import { config as envConfig } from 'dotenv';

envConfig();
const env = process.env;

const userDirectory = new UserDirectoryServer(console.log);
userDirectory.enableDocumentation('/docs');
userDirectory.initialize({dbConfig: {
    type: env.DB_TYPE as 'mysql' | 'mssql',
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    synchronize: eval(env.DB_SYNC)
}});

userDirectory.start(env.PORT || 3000);
