'use strict';

let DbBookmark = require('./bookmark');

class BookmarkRepository {

    async bookmarkNote(noteId, username) {
        //TODO: handle rejections
        console.log(await DbBookmark.create({'noteId': noteId, 'username': username}));
    }
}

module.exports = BookmarkRepository;