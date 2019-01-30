require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
// const app = require('../lib/app');
// const request = require('supertest');

describe('color route tests', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });



  afterAll(done => {
    return mongoose.connection.close(() => {
      done();
    });
  });

});
