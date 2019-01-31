require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('Colors app', () => {

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection.close(done);
  });

  it('can create a new color', () => {
    return request(app)
      .post('/colors')
      .send({
        name: 'yellow',
        hex: '#FFFF00',
        rgb: 'rgb(255,255,0)'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'yellow',
          hex: '#FFFF00',
          rgb: 'rgb(255,255,0)',
          _id: expect.any(String),
          __v: 0
        });
      });
  });


});
