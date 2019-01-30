const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  hex: {
    type: String,
    required: true
  },
  rgb: {
    type: String,
    required: true
  }
});

const Color = mongoose.model('Color', colorSchema);

module.exports = Color;
