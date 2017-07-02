'use strict'

class DisplayNotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async onNewNote(message, username, display) {
        const note = await this.repository.createNewNote(message, username);
        display.output(note);
    };

    async allNotes(display) {
        const allNotes = await this.repository.findAllNotes();
        display.output(allNotes);
    }

    async byId(noteId, display) {
        const note = await this.repository.findNoteById(noteId);
        display.output(note);
    }

    async bookmarkedBy(username, display) {
        const notes = await this.repository.findBookmarkedNotesByCreatorId(username);
        display.output(notes);
    }
}

module.exports = DisplayNotesUseCase;