const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, rgb } = req.body;
    Color
      .create({ name, hex, rgb })
      .then(createdColor => res.send(createdColor))
      .catch(next);
  });
