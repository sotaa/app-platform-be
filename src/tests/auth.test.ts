import 'mocha';
import { userDirectory as UDPromise } from '..';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Express } from 'express';
import { IdentityErrorCodes } from '../libs/identity/enums/error-codes.enum';

chai.use(chaiHttp);
let should = chai.should();
const expect = chai.expect;

const correctAuthData = { username: 'sample@gmail.com', password: 'password' };
const wrongAuthData = {
  invalidEmail: { username: 'samplegmail.com', password: 'password' },
  invalidPassword: { username: 'sample2@gmail.com', password: 'pord' },
  invalidEmailAndPassword: { username: 'samplegmail.com', password: 'ord' },
  duplicateUsername: { username: 'sample@gmail.com', password: 'password' },
  wrongUsername: { username: 'sample2@gmail.com', password: 'password' },
  wrongPassword: { username: 'sample@gmail.com', password: 'wrongpassword' }
};

let userDirectory: Express;

before(async () => {
  userDirectory = (await UDPromise).app;
});
describe('Authentication', () => {
  
  let loginData: any;

  describe('Register', () => {
    it('Should register new user', async () => {
      const regResult = await chai
        .request(userDirectory)
        .post('/auth/register')
        .send(correctAuthData);
      expect(regResult.body.expiresIn).to.be.greaterThan(0);
      expect(regResult.body.token).not.undefined;
      expect(regResult.body.refreshToken).not.to.be.undefined;
      expect(regResult.body.user).not.undefined;
      expect(regResult.body.user.id).and.be.greaterThan(0);
      expect(regResult.body.user.username).not.undefined;
      loginData = regResult.body;
    });

    it('Should return invalid password error', async () => {
      const regResult = await chai
        .request(userDirectory)
        .post('/auth/register')
        .send(wrongAuthData.invalidPassword);
      expect(regResult.status).eq(400);
      expect(regResult.body instanceof Array).be.true;
      expect(regResult.body).eql([{field: 'password', errors: [{ message: IdentityErrorCodes.PASSWORD_IS_INVALID }]}]);
    });

    it('Should return invalid username error', async () => {
      const regResult = await chai
        .request(userDirectory)
        .post('/auth/register')
        .send(wrongAuthData.invalidEmail);
      expect(regResult.status).eq(400);
      expect(regResult.body instanceof Array).be.true;
      expect(regResult.body).eql([{field: 'username', errors: [{ message: IdentityErrorCodes.USERNAME_IS_NOT_VALID }]}]);
    });

    it('Should return invalid password and invalid username error', async () => {
      const regResult = await chai
        .request(userDirectory)
        .post('/auth/register')
        .send(wrongAuthData.invalidEmailAndPassword);
      expect(regResult.status).eq(400);
      expect(regResult.body instanceof Array).be.true;
      expect(regResult.body).eql([
        {field: 'username', errors: [{ message: IdentityErrorCodes.USERNAME_IS_NOT_VALID }]},
        {field: 'password', errors: [{ message: IdentityErrorCodes.PASSWORD_IS_INVALID }]}
      ]);
    });

    it('Should return duplicate username error', async () => {
      const regResult = await chai
        .request(userDirectory)
        .post('/auth/register')
        .send(wrongAuthData.duplicateUsername);
      expect(regResult.status).eq(400);
      expect(regResult.body instanceof Array).be.true;
      expect(regResult.body).eql([{field: 'username', errors: [{ message: IdentityErrorCodes.DUPLICATE_USERNAME }]}]);
    });
  });

  describe('Login', () => {
    it('Should login successfully', async () => {
      const loginResult = await chai
        .request(userDirectory)
        .post('/auth/login')
        .send(correctAuthData);
      expect(loginResult.body.expiresIn).to.be.greaterThan(0);
      expect(loginResult.body.token).not.string;
      expect(loginResult.body.refreshToken).not.to.be.string;
      expect(loginResult.body.user).not.undefined;
      expect(loginResult.body.user.id).and.be.greaterThan(0);
      expect(loginResult.body.user.username).eql(correctAuthData.username);
    });

    it('Should fail at logging in with username not found message', async () => {
      const loginResult = await chai
        .request(userDirectory)
        .post('/auth/login')
        .send(wrongAuthData.wrongUsername);
        expect(loginResult.body instanceof Object).be.true;
        expect(loginResult.body).eql({ message: IdentityErrorCodes.USERNAME_NOT_FOUND });
        expect(loginResult.status).eq(400);
    });
  
    it('Should fail at logging in with wrong password message', async () => {
      const loginResult = await chai
        .request(userDirectory)
        .post('/auth/login')
        .send(wrongAuthData.wrongPassword);
      expect(loginResult.body instanceof Object).be.true;
      expect(loginResult.body).eql({ message: IdentityErrorCodes.PASSWORD_IS_WRONG });
      expect(loginResult.status).eq(400);
    });
  });

  describe('Refresh Token', () => {
    it('Should get new token pair', async () => {
      const rtResult = await chai.request(userDirectory).get('/auth/token/' + loginData.refreshToken);
      expect(rtResult.body.refreshToken).be.string;
      expect(rtResult.body.refreshToken.length).greaterThan(20);
      expect(rtResult.body.token).be.string;
      expect(rtResult.body.token.length).greaterThan(20);
      expect(rtResult.status).eq(200);
    });

    it('Should return invalid refresh token error', async () => {
      const rtResult = await chai.request(userDirectory).get('/auth/token/AN_INVALID_TOKEN');
      expect(rtResult.body instanceof Object).be.true;
      expect(rtResult.body).eql({ message: IdentityErrorCodes.TOKEN_IS_NOT_VALID });
      expect(rtResult.status).eq(400);
    });
  });
});
