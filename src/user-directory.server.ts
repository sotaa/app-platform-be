import 'reflect-metadata';
import './controllers';

import * as express from 'express';
import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';
import { DBConfiguration, initializeDatabase } from './services';

export class UserDirectoryServer {
  protected app: express.Express;
  constructor(protected log: Function) {
    this.app = express();
  }

  public async initialize(config: UserDirectoryConfiguration) {
    initializeDatabase(config.dbConfig);
    RegisterRoutes(this.app);
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