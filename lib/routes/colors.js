const { Router } = require('express');
const Color = require('../models/Color');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { color } = req.body;
    Color.create({ color }, (err, createdColor) => {
      res.send(createdColor);
    });
  })
  .get('/', (req, res, next) => {
    Color.find((err, listOfColors) => {
      res.send(listofColors);
    });
  })
  .get('/:id', (req, res, next) => {
    Color.findById(req.params.id, (err, color) => {
      res.send(color)
    });
  })
  .delete('/:id', ( req, res, next) => {
    Color.findByIdAndDelete(req.params.id, (err, data) => {
      if(err) return next(err);
      res.send(data);
    });
  });