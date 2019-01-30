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

  // it('can create a ron swanson tweet', () => {
  //   return createUser('test user')
  //     .then(createdUser => {
  //       return request(app)
  //         .post('/tweets/?random=true')
  //         .send({
  //           //create with reference to a user, user's id who we created above
  //           //handle is reference to user
  //           handle: createdUser._id,
  //           text: 'some text',
  //           tag: 'code'
  //         })
  //         .then(res => {
  //           expect(res.body).toEqual({
  //             handle: expect.any(String),
  //             text: 'There are only three ways to motivate people: money, fear, and hunger.',
  //             tag: 'code',
  //             _id: expect.any(String),
  //             __v: 0
  //           });
  //         });
  //     });
  // });

  // it('can list all the tweets in the database', () => {
  //   const handles = ['roxy1', 'roxy2', 'roxy3', 'roxy4'];
  //   return Promise.all(handles.map(createTweet))
  //     .then(() => {
  //       return request(app)
  //         .get('/tweets');
  //     })
  //     .then(({ body }) => {
  //       expect(body).toHaveLength(5);
  //     });
  // });

  // it('gets a tweet by id', () => {
  //   return createTweet('kristin1')
  //     .then(createdTweet => {
  //       return request(app) 
  //         .get(`/tweets/${createdTweet._id}`)
  //         .then(res => {
  //           expect(res.body).toEqual({
  //             handle: expect.any(Object),
  //             text: 'some text',
  //             tag: 'code',
  //             _id: expect.any(String)
  //           });
  //         });
  //     });
  // });

  // it('updates a tweet with :id and returns the update', () => {
  //   return createTweet('kristin1')
  //     .then(createdTweet => {
  //       createdTweet.text = 'new text';
  //       return request(app)
  //         .patch(`/tweets/${createdTweet._id}`)
  //         .send(createdTweet);
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         handle: expect.any(Object),
  //         text: 'new text',
  //         tag: 'code',
  //         _id: expect.any(String)
  //       });
  //     });
  // });

  // it('deletes a tweet with :id and returns the delete count', () => {
  //   return createTweet('baller for lyfe')
  //     .then((createdTweet) => {
  //       const id = createdTweet._id;
  //       return request(app)
  //         .delete(`/tweets/${id}`)
  //         .then(res => {
  //           expect(res.body).toEqual({ 'deleted': 1 });
  //         });
  //     });
  // });
});

afterAll((done) => {
  mongoose.connection.close(done);
});
