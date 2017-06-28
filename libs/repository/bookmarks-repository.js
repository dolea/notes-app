'use strict';

const DbNote = require('./mongo-note');
const DbBookmark = require('./bookmark');

class BookmarkRepository {

    async addBookmarkedNote(username, noteId) {
        //TODO: handle rejections
        console.log(await DbBookmark.update({'_id': username}, {$push: {'bookmarkedNotes': noteId}}, {upsert: true}));
    }
}

module.exports = BookmarkRepository;