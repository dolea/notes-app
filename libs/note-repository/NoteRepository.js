'use strict';

const DbNote = require('./mongo-note');
const Note = require('../notes/note');

class NoteRepository {

    async createNewNote(note) {
        const mongoNote = await DbNote.create(note);
        return newNoteFrom(mongoNote);
    }

    async displayAllNotes() {
        const mongoNotes = await DbNote.find();
        return mongoNotes.map(mongoNote => newNoteFrom(mongoNote));
    }
}

function newNoteFrom(mongoNote) {
    return new Note(mongoNote._id, mongoNote.message, mongoNote.creator);
}

module.exports = NoteRepository;