'use strict'

class BookmarkNoteUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async bookmarkNote(username, noteId, display) {
        if(!username || !noteId) return display.outputValidationError("username or noteId invalid");

        return await this.repository.pushBookmarkedNote(username, noteId);
    }
}

module.exports = BookmarkNoteUseCase;