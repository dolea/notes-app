'use strict';

class Note {

    constructor(noteId, message, author) {
        this.noteId = noteId;
        this.message = message;
        this.author = author;
    }
}

module.exports = Note;