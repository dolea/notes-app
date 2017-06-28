'use strict';

const DbNote = require('./mongo-note');
const DbBookmark = require('./bookmark');

class BookmarkRepository {

    async addBookmarkedNote(username, noteId) {
        //TODO: handle rejections
        console.log(await DbBookmark.create({'username': username, 'bookmarkedNotes': noteId}));
    }

    async findBookmarkedNotesByCreatorId(username) {
        //TODO: coupling use case to mongo
        return await DbBookmark.findOne({'username': username}).populate('bookmarkedNotes');
    }
}

module.exports = BookmarkRepository;