const { Router } = require('express');
const Color = require('../models/Color');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    Color.create({ 
      handle,
      text 
    }, (err, createdColor) => {
      if(err) return next(err);
      res.send(createdColor);
    });
  })

  .get('/', (req, res, next) => {
    Color.find((err, listOfColors) => {
      if(err) return next(err);
      res.send(listOfColors);
    });
  })

  .get('/:id', (req, res, next) => {
    Color.findById(req.params.id, (err, Color) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad id: ${req.params.id}`));
        }
        else {
          return next(err); 
        }
      }
      res.send(Color);
    });
  })

  // bonus updated color
  .put('/:id', (req, res, next) => {
    const { handle, text } = req.body;
    Color.findByIdAndUpdate(req.params.id, 
      { handle, text },
      (err, updatedColor) => {
        if(err) return next(err);
        res.send(updatedColor);
      });
  })
  
  .delete('/:id', (req, res, next) => {
    Color.findByIdAndDelete(req.params.id, (err, data) => {
      if(err) return next(err);
      res.send(data);
    });
  });
