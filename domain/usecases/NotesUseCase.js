'use strict'

class NotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    onNewNote(note) {
        this.repository.createNewNote({message : note.message});
    };
}

module.exports = NotesUseCase;