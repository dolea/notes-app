'use strict'

class NotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    onNewNote(note) {
        //TODO: return or pass the result of the promise
        this.repository.createNewNote({message : note.message});
    };

    async findAllNotes() {
        //TODO: instead of returning, it is probably better to send it back through an Display abstraction
        return await this.repository.findAllNotes();
    }
}

module.exports = NotesUseCase;