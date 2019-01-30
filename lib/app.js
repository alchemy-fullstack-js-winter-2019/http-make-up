
const express = require('express');
const app = express();
const color = require('./routes/color');
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());
app.use('/color', connection, color);

app.use(notFound);

app.use(handler);

module.exports = app;
