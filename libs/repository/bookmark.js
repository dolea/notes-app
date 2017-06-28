'use strict';

const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    _id: String,
    bookmarkedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});
mongoose.model('Bookmark', BookmarkSchema);

module.exports = mongoose.model('Bookmark');