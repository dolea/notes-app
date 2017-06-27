'use strict';

let DbNote = require('./note');

class NoteRepository {

    async createNewNote(note) {
        const mongoNote = await DbNote.create(note);
        //TODO: handle rejections
        return mongoNote._id;
    }

    async displayAllNotes() {
        //TODO: coupled to mongo model
        return await DbNote.find();
    }
}

module.exports = NoteRepository;