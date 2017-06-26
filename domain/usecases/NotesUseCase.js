'use strict'

class NotesUseCase {
    constructor() {
        //TODO: inject collaborators
    }

    onNewNote(note) {
        let DbNote = require(__base + '/note-repository/note');
        DbNote.create({
                message : note.message,
            },
            function (err, note) {
                //TODO: return or handle
                console.log(note);
            });
    };
}

module.exports = NotesUseCase;