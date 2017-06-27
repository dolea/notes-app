'use strict';

let DbBookmark = require('./bookmark');

class BookmarkRepository {

    async bookmarkNote(noteId, username) {
        //TODO: mongoose promises are deprecated (http://mongoosejs.com/docs/promises.html)
        //TODO: handle rejections
        console.log(await DbBookmark.create({'noteId': noteId, 'username': username}));
    }
}

module.exports = BookmarkRepository;