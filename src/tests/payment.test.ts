import 'mocha';
import {userDirectory as UDPromise} from '..';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Express } from 'express';

chai.use(chaiHttp);
let should = chai.should();
const expect = chai.expect;
let userDirectory: Express;

before(async () => {
  userDirectory = (await UDPromise).app;
});

