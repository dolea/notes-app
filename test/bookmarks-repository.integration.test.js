'use strict';

const mongoose = require('mongoose');
// follow mongoose recommendation of using own promise library
mongoose.Promise = require('bluebird');
const db = mongoose.connect('mongodb://localhost/test');

const expect = require("chai").expect;

const BookmarksRepository = require('../libs/repository/bookmarks-repository');
const DbBookmark = require('../libs/repository/mongo-bookmark');

describe("BookmarksRepository",() => {
    function cleanUp () {
        db.connection.db.dropDatabase();
    }

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