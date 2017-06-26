'use strict'

class CreateNote {
    constructor() {
        //TODO: inject collaborators
    }

    onNote(note) {
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

module.exports = CreateNote;