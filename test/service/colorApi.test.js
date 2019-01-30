const { 
  getColor
} = require('../../lib/service/colorApi');

describe('colors', () => {
  it('gets a color by id', () => {
    return getColor(1)
      .then(color => {
        expect(color).toEqual({
          name: 'red',
          hex: '#FF0000',
          rgb: 'rgb(255, 0, 0)',
          __v: 0,
          _id: String

        });
      });
  });
});
