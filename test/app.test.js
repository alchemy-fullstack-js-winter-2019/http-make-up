require('dotenv').config();
require('../lib/utils/connect')();
const app = require('../lib/app');
const request = require('supertest');
const mongoose = require('mongoose');

const createColor = (name) => {
  return request(app)
    .post('/colors')
    .send({
      name,
      hex:'#FF0000',
      rgb: 'rgb(255, 0, 0)'
    })
    .then(res => res.body);
};

// POST /colors to create a new color
// GET /colors returns a list of colors
// GET /colors/:id returns a color by id
// DELETE /colors/:id to delete a color

describe('color', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });
  it('can post a color', () => {
    return request(app)
      .post('/colors')
      .send({
        name: 'red',
        hex:'#FF0000',
        rgb: 'rgb(255, 0, 0)'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'red',
          hex:'#FF0000',
          rgb: 'rgb(255, 0, 0)',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can get a list of colors', () => {
    const colors = ['blue', 'teal', 'purple'];
    return Promise.all(colors.map(createColor))
      .then(() => {
        return request(app)
          .get('/colors')
          .then(res => {
            expect(res.body).toHaveLength(3);
          });
      });
  });
  it('can get a color by id', () => {
    return createColor('grassy green')
      .then(createdColor => {
        return request(app)
          .get(`/colors/${createdColor._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'grassy green',
              hex:'#FF0000',
              rgb: 'rgb(255, 0, 0)',
              __v: 0,
              _id: expect.any(String)
            });
          });
      });
  });
  it('can delete a color by id', () => {
    return createColor('bionic blue')
      .then(createdColor => {
        return request(app)
          .delete(`/colors/${createdColor._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'bionic blue',
          hex:'#FF0000',
          rgb: 'rgb(255, 0, 0)',
          __v: 0,
          _id: expect.any(String)
        });
      });
  });
});
