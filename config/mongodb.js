'use strict';

const mongoose = require('mongoose');
// follow mongoose recommendation of using own promise library
mongoose.Promise = require('bluebird');

module.exports = mongoose.connect('mongodb://localhost/kubide');