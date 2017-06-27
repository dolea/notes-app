'use strict'

class NotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    onNewNote(message, username, display) {
        this.repository.createNewNote({message : message, creator : username})
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    };

    displayAllNotes(display) {
        this.repository.findAllNotes()
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }

    displayNote(noteId, display) {
        this.repository.findNoteById(noteId)
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }
}

module.exports = NotesUseCase;