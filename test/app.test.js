require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('Colors app', () => {

  const createColor = (name) => {
    return request(app)
      .post('/colors')
      .send({ 
        name: name,
        hex: 'hex',
        rgb: 'rgb'
      })
      .then(res => res.body); 
  };

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

  it('can get a list of colors', () => {
    return Promise.all(['yellow', 'blue', 'black'].map(createColor))
      .then(() => {
        return request(app)
          .get('/colors');
      })
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });


});
