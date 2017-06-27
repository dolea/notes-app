'use strict'

class BookmarkUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    bookmarkNote(username, noteId) {
        this.repository.addBookmarkedNote(noteId, username);
    }
}

module.exports = BookmarkUseCase;