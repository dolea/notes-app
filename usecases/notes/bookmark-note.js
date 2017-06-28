'use strict'

class BookmarkNoteUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async bookmarkNote(username, noteId) {
        return await this.repository.addBookmarkedNote(username, noteId);
    }
}

module.exports = BookmarkNoteUseCase;