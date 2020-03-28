import 'reflect-metadata';
import './controllers';

import * as express from 'express';
import { userDirectoryRouter } from './routes';
import * as swaggerUi from 'swagger-ui-express';
import { DBConfiguration, initializeDatabase, clean } from '../services';
import { ILogger } from '../logger';
import { logMiddleware, createAuthMiddleware } from './middlewares';
import { userProfile } from './middlewares/userProfile.middleware';
import { iocContainer, TYPES } from '../ioc';
import { IIdentityConfig } from '../libs/identity/interfaces';
import { AUTHENTICATED_ROUTES, USER_PROFILE_ROUTES } from './routes/authenticated-routes.const';
import { secure, IRouteConfig } from '../libs/guard/express';
import { seedDB } from '../services/bootstrap/seeder';
import * as cors from 'cors';

export class UserDirectoryServer {
  app: express.Express;
  protected logger: ILogger;

  constructor(protected config: UserDirectoryConfiguration) {
    this.logger = config.logger || (console as any);
    this.app = express();
  }

  private async initialize() {
    this.app.use(express.json());
    this.handleUncaughtExceptions();
    this.secure(AUTHENTICATED_ROUTES);
    this.app.use(userDirectoryRouter(this.logger));
  }

  /**
   * Log all incoming requests and outgoing response.
   */
  public enableRequestLogging(logger?: ILogger) {
    this.app.use(logMiddleware(logger || this.logger));
  }

  enableCORS(options?: cors.CorsOptions) {
    this.app.use(cors(options));
  }

  /**
   * This method is responsible for cleaning the project and refresh everything such as database and uploaded files.
   * NOT RECOMMENDED TO BE USED ON PRODUCTION ENVIRONMENT.
   */
  public clean() {
    // TODO: Uploaded file cleaner added.
    return clean();
  }

  /**
   * this function will seed database with some default values.
   * @param values default values.
   */
  public seedDatabase(values: any) {
    return seedDB(values);
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
    process.on('unhandledRejection', this.logger.error.bind(this));
    process.on('uncaughtException', this.logger.error.bind(this));
    process.on('warning', this.logger.warn.bind(this));
  }

  secure(routes: IRouteConfig[]) {
    const authMiddleware = createAuthMiddleware(iocContainer.get<IIdentityConfig>(TYPES.IIdentityConfig).secretKey);
    for (let route of routes) {
      this.app.use(route.path, authMiddleware);
    }
    this.app.get('/users/:id', userProfile);
    this.app.put('/users/:id', userProfile);

    secure(this.app, routes, iocContainer.get(TYPES.IGuardService));
  }

  public async start(port: string | number) {
    await initializeDatabase(this.config.dbConfig);
    this.initialize();
    this.logger.info(`Connected to database ${this.config.dbConfig.database} on server ${this.config.dbConfig.host}`);
    this.app.listen(port, () => this.logger.info(`User Directory is started on port ${port}`));
  }
}

export interface UserDirectoryConfiguration {
  logger?: ILogger;
  dbConfig: DBConfiguration;
}
