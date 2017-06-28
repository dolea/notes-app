'use strict'

class DisplayNotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    onNewNote(message, username, display) {
        this.repository.createNewNote(message, username)
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    };

    allNotes(display) {
        this.repository.findAllNotes()
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }

    byId(noteId, display) {
        this.repository.findNoteById(noteId)
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }

    bookmarkedBy(username, display) {
        this.repository.findBookmarkedNotesByCreatorId(username)
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }
}

module.exports = DisplayNotesUseCase;