require('dotenv').config();
require('../lib/utils/connect')();
const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

const createColor = (name) => {
  return request(app)
    .post('/colors')
    .send({ 
      name: name,
      hex: 'some hex',
      rgb: 'some rgb'
    })
    .then(res => res.body); 
};

describe('colors app', () => {
  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  // beforeEach(done => {
  //   createTweet('General Roxy');
  //   done();
  // });

  it('creates a new color', () => {
    return request(app)
      .post('/colors')
      .send({
        name: 'black',
        hex: 'random hex',
        rgb: 'rgb(0, 0, 0)'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'black',
          hex: 'random hex',
          rgb: 'rgb(0, 0, 0)',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('can list all the colors in the database', () => {
    const names = ['blue', 'orange', 'red', 'grey'];
    return Promise.all(names.map(createColor))
      .then(() => {
        return request(app)
          .get('/colors');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(4);
      });
  });

  it('gets a color by id', () => {
    return createColor('grey')
      .then(createdColor => {
        return request(app) 
          .get(`/colors/${createdColor._id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'grey',
              hex: 'some hex',
              rgb: 'some rgb',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('deletes a color with :id and returns the delete count', () => {
    return createColor('green')
      .then((createdColor) => {
        const id = createdColor._id;
        return request(app)
          .delete(`/colors/${id}`)
          .then(res => {
            expect(res.body).toEqual({ 'deleted': 1 });
          });
      });
  });
});

afterAll((done) => {
  mongoose.connection.close(done);
});
