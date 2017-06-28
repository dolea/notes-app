'use strict';

const DbBookmark = require('./model/bookmark');

class BookmarkRepository {

    async addBookmarkedNote(username, noteId) {
        //TODO: handle rejections
        return await DbBookmark.update({'_id': username}, {$push: {'bookmarkedNotes': noteId}}, {upsert: true});
    }
}

module.exports = BookmarkRepository;