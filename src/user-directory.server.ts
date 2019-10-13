import 'reflect-metadata';
import './controllers';

import * as express from 'express';
import { RegisterRoutes } from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';

export class UserDirectoryServer {
  app: express.Express;
  constructor(protected log: Function) {
    this.app = express();
  }

  private initialize() {
    RegisterRoutes(this.app);
  }

  enableDocumentation(url: string) {
    try {
      const swaggerDocument = require('../swagger.json');
      this.app.use(url, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (err) {
      this.log('Unable to load swagger.json', err);
    }
  }

  start(port: string | number) {
      this.initialize();
    this.app.listen(port, () => this.log(`server is started on port ${port}`));
  }
}
