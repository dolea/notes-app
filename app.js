var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./note/NoteController');
app.use('/notes', UserController);

module.exports = app;