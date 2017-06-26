'use strict';

let DbNote = require('./note');

class NoteRepository {

    async createNewNote(note) {
        //TODO: mongoose promises are deprecated (http://mongoosejs.com/docs/promises.html)
        const mongoNote = await DbNote.create({message : note.message});
        //TODO: handle rejections
        return mongoNote._id;
    }
}

module.exports = NoteRepository;