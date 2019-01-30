const express = require('express');
const app = express();
const colors = require('./router/colors');
// const notFound = require('./middleware/notFound');
// const { handler } = require('./middleware/error');
// const connection = require('./middleware/connect');


app.use(express.json());

app.use('/colors', colors);

// app.use(notFound);

// app.use(handler);


module.exports = app;
