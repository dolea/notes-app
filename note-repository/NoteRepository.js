'use strict';

let DbNote = require('./note');

class NoteRepository {

    createNewNote(note) {
        DbNote.create({
                message : note.message,
            },
            function (err, note) {
                //TODO: return or handle
                console.log(note);
            });
    }
}

module.exports = NoteRepository;