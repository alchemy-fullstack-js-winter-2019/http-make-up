module.exports = {
  getColor() {
    return Promise.resolve({
      name: 'red',
      hex: '#FF0000',
      rgb: 'rgb(255, 0, 0)',
      __v: 0,
      _id: String
    });
  }
};
