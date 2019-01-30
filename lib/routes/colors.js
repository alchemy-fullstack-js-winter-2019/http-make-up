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
    
  })
  .delete('/:id', ( req, res, next) => {

  })