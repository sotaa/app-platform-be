import 'mocha';
import {userDirectory as UDPromise} from '..';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {Express } from 'express';

chai.use(chaiHttp);
let should = chai.should();
const expect = chai.expect;

let sample = {
  name: 'string',
  email: 'string',
  password: 'string',
  mobile: 'string',
  tokens: [
    {
      type: 10,
      value: 'string'
    }
  ],
  expireDate: '2019-10-19T16:55:03.782Z',
  registerDate: '2019-10-19T16:55:03.782Z'
};

let id = 1;

let userDirectory: Express;

before(async () => {
  userDirectory = (await UDPromise).app;
});

describe('users', () => {
  describe('GET: /users', () => {
    it('should return status 200 with an empty array in body', () => {
      return chai
        .request(userDirectory)
        .get('/users')
        .then(res => {
          res.should.have.status(200);
          expect(res.body).to.instanceOf(Array);
        });
    });
  });

  describe('POST: /user', () => {
    it('should create a new user', () => {
      return chai
        .request(userDirectory)
        .post('/users')
        .send(sample)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body)
            .have.property('id')
            .and.be.greaterThan(0);
          expect(res.body.name).to.be.deep.equal(sample.name);
        });
    });
  });

  describe('GET: /users/{id}', () => {
    it('Should return object with id ' + id, () => {
      return chai
        .request(userDirectory)
        .get('/users/' + id)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body)
            .have.property('id')
            .and.be.equal(1);
        });
    });
  });

  describe('PUT: /users/{id}', () => {
    it('Should update the user with id ' + id, () => {
      const UPDATED_NAME = 'updated name';
      const data = Object.assign({}, sample, { name: UPDATED_NAME });
      return chai
        .request(userDirectory)
        .put('/users/' + id)
        .send(data)
        .then(res => {
          expect(res).have.status(200);
          return chai
            .request(userDirectory)
            .get('/users/' + id)
            .then(res => {
              expect(res).have.status(200);
              expect(res.body.name).equal(UPDATED_NAME);
              const NEW_NAME = 'new name';
              return chai
                .request(userDirectory)
                .put('/users/' + id)
                .send(Object.assign(data, { name: NEW_NAME }))
                .then(res => {
                  expect(res).have.status(200);
                  return chai
                    .request(userDirectory)
                    .get('/users/' + id)
                    .then(res => {
                      expect(res).have.status(200);
                      expect(res.body.name).equal(NEW_NAME);
                    });
                });
            });
        });
    });
  });

  describe('DELETE: /users/{id}', () => {
    it('Should delete user', () => {
      return chai
        .request(userDirectory)
        .post('/users')
        .send(sample)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body).has.property('id');

          return chai
            .request(userDirectory)
            .delete('/users/' + res.body.id)
            .then(res => {
              expect(res).have.status(200);
              return chai
                .request(userDirectory)
                .get('/users/' + res.body.id)
                .then(res => {
                  expect(res).have.status(400);
                });
            });
        });
    });
  });
});
