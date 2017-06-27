'use strict'

class NotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    onNewNote(message, username) {
        //TODO: return or pass the result of the promise
        this.repository.createNewNote({message : message, creator : username});
    };

    displayAllNotes(display) {
        this.repository.displayAllNotes()
            .then(notes => display.output(notes))
            .catch(error => display.outputError(error));
    }
}

module.exports = NotesUseCase;