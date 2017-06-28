'use strict';

const mongoose = require('mongoose');
// follow mongoose recommendation of using own promise library
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/test');

const expect = require("chai").expect;

const BookmarksRepository = require('../libs/repository/bookmarks-repository');

describe("Stores a bookmark",() => {
    it("should store a bookmark", () => {
        const anyNoteId = mongoose.Types.ObjectId();
        new BookmarksRepository().addBookmarkedNote("::any user::", anyNoteId);
    });
});