import 'reflect-metadata';
import './controllers';

import * as express from 'express';
import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';
import { DBConfiguration, initializeDatabase, clean } from '../services';
import { ILogger } from '../logger';
import { logMiddleware } from './middlewares';

export class UserDirectoryServer {
  app: express.Express;
  protected logger: ILogger;
  
  constructor(protected config: UserDirectoryConfiguration) {
    this.logger = config.logger || console as any;
    this.app = express();
  }

  private async initialize() {
    this.app.use(express.json());
    this.handleUncaughtExceptions();
    RegisterRoutes(this.app);
  }
  
  /**
   * Log all incoming requests and outgoing response.
   */
  public enableRequestLogging(logger?: ILogger) {
    this.app.use(logMiddleware(logger || this.logger));
  }

  /**
   * This method is responsible for cleaning the project and refresh everything such as database and uploaded files.
   * NOT RECOMMENDED TO BE USED ON PRODUCTION ENVIRONMENT.
   */
  public clean() {
    // TODO: Uploaded file cleaner added.
   return clean();
  }

  public enableDocumentation(url: string) {
    try {
      const swaggerDocument = require('../../swagger.json');
      this.app.use(url, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (err) {
      this.logger.error('Unable to load swagger.json', err);
    }
  }

  private handleUncaughtExceptions() {
    process.on('unhandledRejection' , this.logger.error.bind(this) );
    process.on('uncaughtException' , this.logger.error.bind(this));
    process.on('warning', this.logger.warn.bind(this))
  }

  public async start(port: string | number) {
    this.initialize();
    await initializeDatabase(this.config.dbConfig);
    this.app.listen(port, () => this.logger.info(`User Directory is started on port ${port}`));
  }
}


export interface UserDirectoryConfiguration {
  logger?: ILogger;
  dbConfig: DBConfiguration;
}
