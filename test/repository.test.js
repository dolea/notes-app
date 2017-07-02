'use strict';

const mongoose = require('../config').Database;
const expect = require("chai").expect;

const BookmarksRepository = require('../repository/mongo/bookmarks-repository');
const DbBookmark = require('../repository/mongo/model/bookmark');
const NoteRepository = require('../repository/mongo/note-repository');
const DbNote = require('../repository/mongo/model/note');

describe('all repository tests', () => {
    let db;
    before(() => db = mongoose.connect('mongodb://localhost/test'));
    after(() => db.disconnect());

    describe("BookmarksRepository",() => {

        describe("User has no bookmarks",() => {
            before(() => DbBookmark.remove({}));
            after(() => DbBookmark.remove({}));
            it("should store a bookmark", async () => {
                const anyNoteId = mongoose.Types.ObjectId();
                await new BookmarksRepository().pushBookmarkedNote("::any user::", anyNoteId);

                return DbBookmark.findOne().then(bookmark => {
                    expect(bookmark._id).to.equal("::any user::");
                    expect(bookmark.bookmarkedNotes).to.deep.equal([anyNoteId])
                });
            });
        });

        describe("User bookmarks two notes",() => {
            after(() => DbBookmark.remove({}));
            it("should add bookmarks to user", async () => {
                const anyNoteId = mongoose.Types.ObjectId();
                await new BookmarksRepository().pushBookmarkedNote("::any user::", anyNoteId);

                const anotherNoteId = mongoose.Types.ObjectId();
                await new BookmarksRepository().pushBookmarkedNote("::any user::", anotherNoteId);


                return DbBookmark.findOne().then(bookmark => {
                    expect(bookmark._id).to.equal("::any user::");
                    expect(bookmark.bookmarkedNotes).to.deep.equal([anyNoteId, anotherNoteId])
                });
            })
        });

        describe("User bookmarks same note twice",() => {
            after(() => DbBookmark.remove({}));
            it("should add only once", async () => {
                const anyNoteId = mongoose.Types.ObjectId();
                await new BookmarksRepository().pushBookmarkedNote("::any user::", anyNoteId);
                await new BookmarksRepository().pushBookmarkedNote("::any user::", anyNoteId);


                return DbBookmark.findOne().then(bookmark => {
                    expect(bookmark._id).to.equal("::any user::");
                    expect(bookmark.bookmarkedNotes).to.deep.equal([anyNoteId])
                });
            })
        });
    });

    describe("Bookmark notes",() => {
        after(() => {DbNote.remove({}); DbBookmark.remove({})});

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

        it("should return empty for non existent bookmarked notes", async () => {
            return new NoteRepository().findBookmarkedNotesByCreatorId("::non existent::").then(notes => {
                expect(notes).to.deep.equal([]);
            });
        });
    });
});