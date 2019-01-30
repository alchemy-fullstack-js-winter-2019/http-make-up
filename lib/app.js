/* eslint-disable no-console*/

const express = require('express');
const app = express();
const notFound = require('../lib/middleware/notFound');
const { handler } = require('../lib/middleware/error');
const connection = require('./middleware/connection');
const colors = require('../lib/routes/colors');

app.use(require('morgan')('dev', {
  skip() {
    return process.env.NODE_ENV === 'test';
  }
}));

app.use(express.json());
app.use('/', connection, colors);
app.use(notFound);

app.use(handler);

module.exports = app;
