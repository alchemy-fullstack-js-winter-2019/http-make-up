const request = require('supertest');
require('dotenv').config();
require('../lib/utils/connect')();
const app  = require('../lib/app');
const mongoose = require('mongoose');

describe('Color restful API', () => {
  const createColor = (name, hex, rgb) => {
    return request(app)
      .post('/colors')
      .send({
        name: name,
        hex: hex,
        rgb:rgb
      })
      .then(res => res.body);
  };
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('gets list of actors', () => {
    return Promise.all(['white', 'blude', 'purple'].map(createColor))
      .then(createdColor => {
        return request(app)
          .get('/colors/');
      })
      .then(res=> {
        expect(res.body).toHaveLength(3);
      });

  });

  it('creates a new color', () => {
    return createColor('white')
      .then(newColor => {
        return request(app)
          .post('/colors')
          .send(newColor);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'white',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets Color by id', () => {
    return createColor('White')
      .then(createdColor => {
        return Promise.all([
          Promise.resolve(createdColor.id),
          request(app)
            .get(`/colors/${createdColor._id}`)
        ])
          .then(([_id, res]) => {
            expect(res.body).toEqual({
              name: 'White',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('finds Color by id And patches', ()=> {
    return createColor('Whiiiite')
      .then(wrongName => {
        return Promise.all([
          Promise.resolve(wrongName.id),
          request(app)
            .patch(`/colors/${wrongName._id}`)
            .send({ name: 'white' })
        ])
          .then(([_id, res])=> {
            expect(res.body).toEqual({
              name: 'white',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  


});
