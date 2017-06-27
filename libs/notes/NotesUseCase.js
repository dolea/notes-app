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
        this.repository.displayAllNotes()
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }
}

module.exports = NotesUseCase;