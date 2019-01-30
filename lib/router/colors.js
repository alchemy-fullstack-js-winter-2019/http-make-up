const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name, hex, rgb
    } = req.body;
    Color.create({
      name, hex, rgb
    }, (err, newColor) => {
      res.send(newColor);
    });
  })

  .get('/', (req, res) => {
    Color.find((err, colors) => {
      res.send(colors);
    });
  })

  .get('/:id', (req, res) => {
    const _id = req.params.id;
    Color
      .findById(_id)
      .then(foundCOlor => {
        res.send(foundCOlor);
      });
  })

  .patch('/:id', (req, res) => {
    const _id = req.params.id;
    Color
      .findByIdAndUpdate(_id, req.body, { new: true })
      .then(fixedName => {
        res.send(fixedName);
      });
  });
