'use strict';

const Application = require('./web');
new Application().startApplicationWith({Port: 3000, DatabaseUrl: 'mongodb://localhost/kubide'});