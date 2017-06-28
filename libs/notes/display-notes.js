'use strict'

class DisplayNotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    onNewNote(message, username, display) {
        this.repository.createNewNote({message : message, creator : username})
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
}

module.exports = DisplayNotesUseCase;