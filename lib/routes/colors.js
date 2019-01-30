const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, rgb } = req.body;
    Color
      .create({ name, hex, rgb })
      .then(color => res.send(color))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Color
      .find()
      .then(colors => res.send(colors))
      .catch(next);
  });

  
