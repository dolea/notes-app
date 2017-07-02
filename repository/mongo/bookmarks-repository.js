'use strict';

const DbBookmark = require('./model/bookmark');

class BookmarkRepository {

    async pushBookmarkedNote(username, noteId) {
        return await DbBookmark.update({'_id': username}, {$addToSet: {'bookmarkedNotes': noteId}}, {upsert: true});
    }
}

module.exports = BookmarkRepository;