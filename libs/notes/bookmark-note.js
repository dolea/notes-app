'use strict'

class BookmarkNoteUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    bookmarkNote(username, noteId) {
        this.repository.addBookmarkedNote(username, noteId);
    }
}

module.exports = BookmarkNoteUseCase;