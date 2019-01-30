require('dotenv').config();
require('../lib/utils/connect')();

const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');
const Color = require('../lib/models/Color');

describe('color route tests', () => {

  const newColor = ({ name, hex, rgb }) => {
    return Color.create({ name, hex, rgb });
  };

  beforeEach(done => {
    return mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  it('create a new color', () => {
    return request(app)
      .post('/colors')
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

  it('get a list of colors', () => {
    const colorList = [{ name: 'sage', hex: '#6D825B', rgb: 'rgb(109, 130, 91)' },  { name: 'blue', hex: '#73BBD0', rgb: 'rgb(115, 187, 208)' }];
    return Promise.all(colorList.map(newColor))
      .then(() => {
        return request(app)
          .get('/colors')
          .then(res => {
            expect(res.body).toHaveLength(2);
          });
      });
  });

  it('get a color by id', () => {
    return newColor({ 
      name: 'sage', 
      hex: '#6D825B', 
      rgb: 'rgb(109, 130, 91)' 
    })
      .then(createdColor => {
        return request(app)
          .get(`/colors/${createdColor._id}`)
          .then(res => {
            expect(res.body).toEqual({ 
              _id: expect.any(String),
              name: 'sage', 
              hex: '#6D825B', 
              rgb: 'rgb(109, 130, 91)',
              __v: 0 
            });
          });
      });
  });

  it('delete a color by id', () => {
    return newColor({ name: 'blue', hex: '#73BBD0', rgb: 'rgb(115, 187, 208)' })
      .then(color => {
        return request(app)
          .delete(`/colors/${color._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

});
