'use strict';

const config = require('../config');
const App = require('./server');

const Server = App.listen(3000);

module.exports = {Server: Server};