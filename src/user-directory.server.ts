import 'reflect-metadata';
import './controllers';

import * as express from 'express';
import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';
import { DBConfiguration, initializeDatabase, clean } from './services';

export class UserDirectoryServer {
  app: express.Express;
  constructor(protected log: Function) {
    this.app = express();
  }

  public async initialize(config: UserDirectoryConfiguration) {
    initializeDatabase(config.dbConfig);
    this.app.use(express.json());
    RegisterRoutes(this.app);
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
      const swaggerDocument = require('../swagger.json');
      this.app.use(url, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (err) {
      this.log('Unable to load swagger.json', err);
    }
  }

  public start(port: string | number) {
    this.app.listen(port, () => this.log(`server is started on port ${port}`));
  }
}


export interface UserDirectoryConfiguration {
  dbConfig: DBConfiguration;
}