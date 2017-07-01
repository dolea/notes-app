'use strict';

const Database = require('../config').Database;
const App = require('./server');

const DatabaseConnection = Database.connect('mongodb://localhost/kubide');
const Server = App.listen(3000);

module.exports = {Server: Server, Db: DatabaseConnection};