import 'mocha';
import {userDirectory as UDPromise} from '..';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Express } from 'express';

chai.use(chaiHttp);
let should = chai.should();
const expect = chai.expect;

let sample = {
  name: 'string',
  price: 0,
  dateRange: 0,
  isActive: true,
  description: 'string'
};

let id = 1;

let userDirectory: Express;

before(async () => {
  userDirectory = (await UDPromise).app;
});
