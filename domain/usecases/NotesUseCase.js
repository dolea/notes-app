'use strict'

class NotesUseCase {
    constructor(repository, display) {
        this.repository = repository;
        this.display = display;
    }

    onNewNote(note) {
        //TODO: return or pass the result of the promise
        this.repository.createNewNote({message : note.message});
    };

    displayAllNotes() {
        //TODO: instead of returning, it is probably better to send it back through an Display.js abstraction
        this.repository.displayAllNotes()
            .then(notes => this.display.output(notes))
            .catch(error => this.display.outputError(error));
    }
}

module.exports = NotesUseCase;