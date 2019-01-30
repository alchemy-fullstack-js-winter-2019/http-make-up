const request = require('supertest');
const app = require('../lib/app');

describe('app', () => {
  it('gets a color by id', () => {
    return request(app)
      .get('/color/1')
      .then(res => {
        expect(res.body).toEqual({
          name: 'red',
          hex: '#FF0000',
          rgb: 'rgb(255, 0, 0)',
          __v: 0,
          _id: String
        });
      });
  });
});
