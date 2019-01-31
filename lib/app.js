const express = require('express');
const app = express();
const colors = require('./routes/colors');

app.use(express.json());
app.use('/colors', colors);


module.exports = app;
