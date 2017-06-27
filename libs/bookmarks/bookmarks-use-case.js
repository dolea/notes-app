'use strict'

class BookmarkUseCase {
    constructor(repository, display) {
        this.repository = repository;
        this.display = display;
    }

    bookmarkNote(noteId, username) {
        this.repository.bookmarkNote(noteId, username);
    }
}

module.exports = BookmarkUseCase;