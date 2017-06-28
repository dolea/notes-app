'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = mongoose.connect('mongodb://localhost/test');

const expect = require("chai").expect;

const BookmarksRepository = require('../repository/mongo/bookmarks-repository');
const DbBookmark = require('../repository/mongo/mongo-bookmark');
const NoteRepository = require('../repository/mongo/note-repository');
const DbNote = require('../repository/mongo/mongo-note');

describe("BookmarksRepository",() => {

    describe("User has no bookmarks",() => {
        after(cleanUp);
        it("should store a bookmark", async () => {
            const anyNoteId = mongoose.Types.ObjectId();
            await new BookmarksRepository().addBookmarkedNote("::any user::", anyNoteId);

            return DbBookmark.findOne().then(bookmark => {
                expect(bookmark._id).to.equal("::any user::");
                expect(bookmark.bookmarkedNotes).to.deep.equal([anyNoteId])
            });
        });
    });

    describe("User bookmarks two notes",() => {
        after(cleanUp);
        it("should add bookmarks to user", async () => {
            const anyNoteId = mongoose.Types.ObjectId();
            await new BookmarksRepository().addBookmarkedNote("::any user::", anyNoteId);

            const anotherNoteId = mongoose.Types.ObjectId();
            await new BookmarksRepository().addBookmarkedNote("::any user::", anotherNoteId);


            return DbBookmark.findOne().then(bookmark => {
                expect(bookmark._id).to.equal("::any user::");
                expect(bookmark.bookmarkedNotes).to.deep.equal([anyNoteId, anotherNoteId])
            });
        })
    });
});

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