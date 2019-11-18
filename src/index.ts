/**
 * Node.js entry point for launching the server.
 * This file should contain all required configuration for running application.
 */

import { UserDirectoryServer } from './express/user-directory.server';
import { config as envConfig } from 'dotenv-flow';
import { applicationLogger, requestLogger } from './logger/winston';

async function createServer() {
  const appLogger = console; // applicationLogger;

  envConfig();
  const config = extractConfig(process.env);
  appLogger.info('userDirectory is using the following configurations:', config);

  const userDirectory = new UserDirectoryServer({ dbConfig: config.dbConfig, logger: appLogger as any });

  /**
   * Enable documentation on /docs route in development mode.
   * Also we will log all incoming requests and outgoing responses on production server.
   */
  if (config.mode !== 'prod' && config.mode !== 'production') {
    userDirectory.enableDocumentation('/docs');
  } else {
    userDirectory.enableRequestLogging(requestLogger as any);
  }

  /** Start the server */
  await userDirectory.start(config.port || 3000);
  /** Cleaning application for testing */
  if (config.mode === 'test') {
    await userDirectory.clean();
    appLogger.log(`database has been cleaned.`);
    userDirectory.app.emit('start test');
  }

  return userDirectory;
}
/**
 * need to export the app for testing purposes.
 */
export const userDirectory = createServer();

/**
 * extract environment variables and return it as an object.
 * @param env process.env
 */
function extractConfig(env: any) {
  return {
    mode: env.NODE_ENV || 'dev',
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
}
