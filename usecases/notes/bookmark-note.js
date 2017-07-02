'use strict'

class BookmarkNoteUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async bookmarkNote(username, noteId, display) {
        if(!username || !noteId) return display.outputValidationError("username or noteId invalid");

        await this.repository.pushBookmarkedNote(username, noteId);
        display.success();
    }
}

module.exports = BookmarkNoteUseCase;