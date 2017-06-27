const mongoose = require('mongoose');
const BookmarkSchema = new mongoose.Schema({
    noteId: mongoose.Schema.Types.ObjectId,
    username: String
});
mongoose.model('Bookmark', BookmarkSchema);

module.exports = mongoose.model('Bookmark');