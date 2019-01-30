require('dotenv').config();
require('../lib/utils/connect')();
const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');

const createcolor = ({ name, hex, rgb }) => {
  return request(app)
    .post('/colors')
    .send({
      name: 'red',
      hex: '#FF0000',
      rgb: 'rgb(255, 0, 0)'
    })
    .then(res => {
      expect(res.body).toEqual({
        name: 'red',
        hex: '#FF0000',
        rgb: 'rgb(255, 0, 0)',
      });
    
    describe('colors', () => {
      beforeEach(done => {
        return mongoose.connection.dropDatabase(() => {
          done();
        });
      });
      it('creates a new color', () => {
        return request(app)
          .post('/colors')
          .send({ name: 'red', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' })
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
      it('gets a color by id', () => {
        return createColor('red')
          .then(createdColor => {
            return request(app)
              .get(`/colors/${_id}`)
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
      it('can delete a color', () => {
        return createColor('red')
          .then(createdColor => {
            const _id = createdcolor._id;
            return request(app)
              .delete(`/colors/${_id}`);
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
