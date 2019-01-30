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
      .post('/')
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
          .get('/')
          .then(res => {
            expect(res.body).toHaveLength(2);
          });
      });
  });

  afterAll(done => {
    mongoose.connection.close();
    done();
  });

});
