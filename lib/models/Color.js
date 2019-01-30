const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  color: {
    name: 'red',
    hex: '#FF0000',
    rgb: 'rgb(255, 0, 0)',
    __v: 0,
    _id: SOME_ID
  }
});

module.exports = mongoose.model('Color', colorSchema);