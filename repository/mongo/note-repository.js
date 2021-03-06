'use strict';

const DbNote = require('./model/note');
const DbBookmark = require('./model/bookmark');
const Note = require('../../usecases/notes/note');

class NoteRepository {

    async createNewNote(message, author) {
        const mongoNote = await DbNote.create({'message': message, 'author': author});
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

    async findBookmarkedNotesByCreatorId(username) {
        const bookmark = await DbBookmark.findOne({'_id': username}).populate('bookmarkedNotes');
        if(bookmark === null) return [];

        return bookmark.bookmarkedNotes.map(mongoNote => newNoteFrom(mongoNote));
    }
}

function newNoteFrom(mongoNote) {
    return new Note(mongoNote._id.toString(), mongoNote.message, mongoNote.author);
}

module.exports = NoteRepository;