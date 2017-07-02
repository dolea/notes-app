'use strict';

const Application = require('./web');
new Application().startApplicationWith({port: 3000, databaseUrl: 'mongodb://localhost/kubide'});