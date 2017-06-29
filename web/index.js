'use strict';

const config = require('../config');
const app = require('./server');

app.listen(3000);

module.exports = app;