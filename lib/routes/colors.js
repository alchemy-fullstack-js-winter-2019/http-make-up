const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, rgb } = req.body;
    Color.create({ 
      name,
      hex,
      rgb
    })
      .then(newColor => res.send(newColor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Color.find()
      .then(colors => req.send(colors))
      .catch(next);  
  })

  .get('/:id', (req, res, next) => {
    Color.findById(req.params.id)
      .then(Color =>res.send(Color))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Color.findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });
