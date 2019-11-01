import 'mocha';
import {userDirectory as UDPromise} from '..';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Express } from 'express';

chai.use(chaiHttp);
let should = chai.should();
const expect = chai.expect;

const correctAuthData = {username: 'sample@gmail.com', password: 'password'};
const wrongAuthData = {
  invalidEmail:  {username: 'samplegmail.com', password: 'password'},
  invalidPassword: {username: 'sample@gmail.com', password: 'pord'},
  invalidEmailAndPassword: {username: 'samplegmail.com', password: 'ord'},
};

let userDirectory: Express;

before(async () => {
  userDirectory = (await UDPromise).app;
});
describe('Authentication',  () => {
    it('Should register new user',async () => {
     const regResult = await chai.request(userDirectory).post('/auth/register').send(correctAuthData);
     expect(regResult.body.expiresIn).to.be.greaterThan(0);
     expect(regResult.body.token).not.undefined;
     expect(regResult.body.refreshToken).not.to.be.undefined;
     expect(regResult.body.user).not.undefined;
     expect(regResult.body.user.id).and.be.greaterThan(0);
     expect(regResult.body.user.username).not.undefined.and.be.equal(0);
    });
})