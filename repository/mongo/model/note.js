'use strict';

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    message: String,
    author: String
});
mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note');