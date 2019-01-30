
const express = require('express');
const app = express();
const color = require('./routes/color');
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');


app.use(express.json());
app.use('/color', connection, require('../lib/routes/color'));

app.use(notFound);

app.use(handler);

module.exports = app;
