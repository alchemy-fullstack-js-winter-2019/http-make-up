const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Color = require('../../lib/models/Colors');

describe('Store', () => {
  it('creates a color', done => {
    color.create({ name: 'red' }, (err, createdColor) => {
      expect(err).toBeFalsy();
      expect(createdColor).toEqual({ name: 'red', _id: expect.any(String) });
      done();
    });
  });
});
