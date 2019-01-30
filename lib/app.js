const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');
const colors = require('./routes/colors');

app.use(express.json());
app.use('/colors', connection, colors);


app.use(notFound);
app.use(handler);

module.exports = app;
