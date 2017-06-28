'use strict';

const mongoose = require('mongoose');
// follow mongoose recommendation of using own promise library
mongoose.Promise = require('bluebird');
const db = mongoose.connect('mongodb://localhost/test');

const expect = require("chai").expect;

const NoteRepository = require('../libs/repository/note-repository');
const DbNote = require('../libs/repository/mongo-note');
const DbBookmark = require('../libs/repository/mongo-bookmark');

describe("NoteRepository",() => {
    after(cleanUp);

    let createdNote;
    it("should add a note and return it", async () => {
        createdNote = await new NoteRepository().createNewNote("::any message::", "::any author::");

        return DbNote.findOne().then(note => {
            expect(note._id.toString()).to.deep.equal(createdNote.noteId);
            expect(note.message).to.equal(createdNote.message).to.equal("::any message::");
            expect(note.author).to.equal(createdNote.author).to.equal("::any author::");
        });
    });

    it("should recover created note", async () => {
        return new NoteRepository().findNoteById(createdNote.noteId).then(returnedNote => {
            expect(returnedNote).to.deep.equal(createdNote);
        });
    });

    it("should recover all notes", async () => {
        const anotherNote = await new NoteRepository().createNewNote("::another message::", "::another author::");

        return new NoteRepository().findAllNotes().then(returnedNotes => {
            expect(returnedNotes[0]).to.deep.equal(createdNote);
            expect(returnedNotes[1]).to.deep.equal(anotherNote);
        });
    });
});

describe("Bookmark notes",() => {
    after(cleanUp);

    it("should return bookmarked notes for a user", async () => {
        const anyNote = await new NoteRepository().createNewNote("::any message::", "::any author::");
        const anotherNote = await new NoteRepository().createNewNote("::another message::", "::another author::");

        await DbBookmark.create({
            _id: "::any user::",
            bookmarkedNotes: [mongoose.Types.ObjectId(anyNote.noteId), mongoose.Types.ObjectId(anotherNote.noteId)]
        });

        return new NoteRepository().findBookmarkedNotesByCreatorId("::any user::").then(notes => {
            expect(notes).to.deep.equal([anyNote, anotherNote]);
        });
    });
});

function cleanUp () {
    db.connection.db.dropDatabase();
}