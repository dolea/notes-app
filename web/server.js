'use strict';

const app = require('express')();

app.use('/api', require('./routes/api/index'));

module.exports = app;