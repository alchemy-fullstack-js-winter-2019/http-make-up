const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createTweet = (hex, name = 'red red') => {
  return request(app)
    .post('/colors')
    .send({ name, hex })
    .then(res => res.body);
};

describe('colors', () => {
  beforeEach(done => {
    rimraf('./data/colors/*', err => {
      done(err);
    });
  });
  beforeEach(done => {
    mkdirp('./data/colors', err => {
      done(err);
    });
  });
  
  it('creates a new tweet', () => {
    return request(app)
      .post('/colors')
      .send({ name: 'red', hex: '#FF0000' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'red',
          hex: '#FF0000',
          _id: expect.any(String)
        });
      });
  });

  it('gets list of colors', () => {
    const colorsToCreate = ['redfish', 'twofish', 'bluefish'];
    return Promise.all(colorsToCreate.map(createTweet))
      .then(() => {
        return request(app)
          .get('/colors');
      })
      .then(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });
  it('gets a tweet by id', () => {
    return createTweet('rowboat')
      .then(createdTweet=> {
        const _id = createdTweet._id;
        return request(app)
          .get(`/colors/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'red red',
              hex: 'rowboat',
              _id
            });
          });
      });
  });
  it('updates a tweet by :id', () => {
    let newTweet = {
      name: 'hi',
      hex: 'test'
    };
    return createTweet('skoolio')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .put(`/colors/${_id}`)
          .send(newTweet);
      })
      .then(res => {
        expect(res.body.name).toEqual('hi');
      });
  });
  it('can delete a tweet', () => {
    return createTweet('gotobed')
      .then(createdTweet => {
        const _id = createdTweet._id;
        return request(app)
          .delete(`/colors/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
  it('error when no tweet by id', () => {
    return request(app)
      .get('/colors/badId')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ error: 'Bad id: badId' });
      });
  });
});


