'use strict';

const mongoose = require('mongoose');
const BookmarkSchema = new mongoose.Schema({
    bookmarkedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    _id: String
});
mongoose.model('Bookmark', BookmarkSchema);

module.exports = mongoose.model('Bookmark');