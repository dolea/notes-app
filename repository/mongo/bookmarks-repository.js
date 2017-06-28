'use strict';

const DbBookmark = require('./model/bookmark');

class BookmarkRepository {

    async addBookmarkedNote(username, noteId) {
        //TODO: $addToSet to avoid duplicates it's actually business logic. Shouldn't be here
        return await DbBookmark.update({'_id': username}, {$addToSet: {'bookmarkedNotes': noteId}}, {upsert: true});
    }
}

module.exports = BookmarkRepository;