const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hex, rgb } = req.body;
    Color
      .create({ name, hex, rgb })
      .then(createdColor => res.send(createdColor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Color
      .find()
      .then(listOfColors => res.send(listOfColors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Color
      .findById(_id)
      .then(foundColor => res.send(foundColor))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Color
      .findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });

