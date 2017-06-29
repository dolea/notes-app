'use strict';

const request = require('request-promise');
const app = require('../web');
const expect = require("chai").expect;

//TODO: fix conflict with repository test (trying to open a mongo connection when already there is one)
describe('executes flow', function () {

    it('should create a note', async () => {
        const createdNote = await request({
            uri: 'http://localhost:3000/api/notes',
            method: 'POST',
            body: {message: "test message", username: "test user"},
            json: true
        });

        expect(createdNote.message).to.be.equal("test message");
        expect(createdNote.author).to.be.equal("test user");
    });

    it('should recover a created note', async () => {
        const createdNote = await request({
            uri: 'http://localhost:3000/api/notes',
            method: 'POST',
            body: {message: "test message", username: "test user"},
            json: true
        });

        const recoveredNote = await request({
            uri: 'http://localhost:3000/api/notes/' + createdNote.noteId,
            json: true
        });

        expect(recoveredNote).to.be.deep.equal(createdNote);
    });

    it('should recover all notes', async () => {
        const recoveredNotes = await request({
            uri: 'http://localhost:3000/api/notes/',
            json: true
        });

        //TODO: fix weak assertion
        expect(recoveredNotes).to.not.be.empty;
    });
});