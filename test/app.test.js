const request = require('supertest');
const app = require('../lib/app');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const createcolor = (name, hex, rgb, _id) => {
  return request(app)
    .post('/colors')
    .send({ 
      name: 'red',
      hex: '#FF0000',
      rgb: 'rgb(255, 0, 0)'
      // eslint-disable-next-line
      __v: 0,
      _id: SOME_ID
     })
    .then(res => {
      expect(res.body).toEqual({
        name: 'red',
        hex: '#FF0000',
        rgb: 'rgb(255, 0, 0)',
        _id: expect.any(String),
        __v: 0
      });
    });
  });
});
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
  
  it('creates a new color', () => {
    return request(app)
      .post('/colors')
      .send({ name: 'red', hex: '#FF0000', rgb:'rgb(255, 0, 0)', _id:  })
      .then(res => {
        expect(res.body).toEqual({
          name: 'red',
          hex: '#FF0000',
          rgb: 'rgb(255, 0, 0)',
          _id: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a color by id', () => {
    return createcolor('rowboat')
      .then(createdcolor=> {
        const _id = createdcolor._id;
        return request(app)
          .get(`/colors/${_id}`)
          .then(res => {
            expect(res.body).toEqual({
              name: 'red',
              rgb: 'rgb(255, 0, 0)',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
  it('updates a color by :id', () => {
    let newcolor = {
      name: 'red',
      hex: ''
    };
    return createcolor('red')
      .then(createdcolor => {
        const _id = createdcolor._id;
        return request(app)
          .put(`/colors/${_id}`)
          .send(newcolor);
      })
      .then(res => {
        expect(res.body.name).toEqual('hi');
      });
  });
  it('can delete a color', () => {
    return createcolor('gotobed')
      .then(createdcolor => {
        const _id = createdcolor._id;
        return request(app)
          .delete(`/colors/${_id}`)
          .then(res => {
            expect(res.body).toEqual({ deleted: 1 });
          });
      });
  });
  it('error when no color by id', () => {
    return request(app)
      .get('/colors/badId')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ error: 'Bad id: badId' });
      });
  });
});


