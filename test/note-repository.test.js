'use strict';

const mongoose = require('mongoose');
// follow mongoose recommendation of using own promise library
mongoose.Promise = require('bluebird');
const db = mongoose.connect('mongodb://localhost/test');

const expect = require("chai").expect;

const NoteRepository = require('../libs/repository/note-repository');
const DbNote = require('../libs/repository/mongo-note');

describe("NoteRepository",() => {
    function cleanUp () {
        db.connection.db.dropDatabase();
    }

    after(cleanUp);

    it("should add a note and return it", async () => {
        const returnedNote = await new NoteRepository().createNewNote("::any message::", "::any author::");

        return DbNote.findOne().then(note => {
            expect(note._id).to.deep.equal(returnedNote.noteId);
            expect(note.message).to.equal(returnedNote.message).to.equal("::any message::");
            expect(note.author).to.equal(returnedNote.author).to.equal("::any author::");
        });
    });
});