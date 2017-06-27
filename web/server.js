'use strict';

const app = require('express')();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes/api/index'));

module.exports = app;