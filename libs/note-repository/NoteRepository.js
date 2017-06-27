'use strict';

const DbNote = require('./mongo-note');
const Note = require('../notes/note');

class NoteRepository {

    async createNewNote(note) {
        const mongoNote = await DbNote.create(note);
        return newNoteFrom(mongoNote);
    }

    async findAllNotes() {
        const mongoNotes = await DbNote.find();
        return mongoNotes.map(mongoNote => newNoteFrom(mongoNote));
    }

    async findNoteById(noteId) {
        const mongoNote = await DbNote.findOne({_id : noteId});
        return newNoteFrom(mongoNote);
    }
}

function newNoteFrom(mongoNote) {
    return new Note(mongoNote._id, mongoNote.message, mongoNote.creator);
}

module.exports = NoteRepository;