'use strict'

class BookmarkUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    bookmarkNote(username, noteId) {
        this.repository.addBookmarkedNote(username, noteId);
    }

    displayBookmarks(username, display) {
        this.repository.findBookmarkedNotesByCreatorId(username)
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }
}

module.exports = BookmarkUseCase;