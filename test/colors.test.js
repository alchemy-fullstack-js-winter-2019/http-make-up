require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');

describe('color route tests', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('create a new color', () => {
    return request(app)
      .post('/')
      .send({ 
        name: 'salmon', 
        hex: '#FD866D', 
        rgb: 'rgb(253, 134, 109)'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'salmon',
          hex: '#FD866D',
          rgb: 'rgb(253, 134, 109)',
          __v: 0
        });
      });
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

});
