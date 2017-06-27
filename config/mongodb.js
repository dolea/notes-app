'use strict';

const mongoose = require('mongoose');
// follow mongoose recommendation of using own promise library
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/kubide');