require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const request = require('supertest');
// const Color = require('../lib/models/Color');
const app = require('../lib/app');

const createColor = (name, hex, rgb = 'a color') => {
  return request(app)
    .then(res => {
      res.send;
    });
};

describe('color app', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can create a new color', () => {
    return request(app)
      .post('/color')
      .send({
        name: 'red',
        hex: '#FF0000',
        rgb: 'rgb(255, 0, 0)',
      })
      .then(res => {
        expect(res.body).toEqual({
          name: expect.any(String),
          hex: '#FF0000',
          rgb: 'rgb(255, 0, 0)',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can get list of colors', () => {
    return Promise.all(['red', 'blue'].map(createColor))
      .then(() => {
        return request(app)
          .get('/color');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);
      });
  });

});
