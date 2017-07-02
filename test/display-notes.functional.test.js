'use strict';

const request = require('request-promise');
const expect = require("chai").expect;
const uuidv4 = require('uuid/v4');

const Application = require('../web');
const app = new Application();

describe('executes flow', function () {
    before(() => app.startApplicationWith({Port: 0, DatabaseUrl: 'mongodb://localhost/test_' + uuidv4()}));
    after(() => app.stopApplication(async db => await db.connection.db.dropDatabase()));

    describe('POST /api/notes', function () {
        it('should create a note', async () => {
            const port = app.serverConnection.address().port;
            const createdNote = await postNote(port, {message: "test message", username: "test user"});
            expect(createdNote.message).to.be.equal("test message");
            expect(createdNote.author).to.be.equal("test user");
        });
    });

    describe('GET /api/notes/:noteId', function () {
        it('should recover a created note', async () => {
            const port = app.serverConnection.address().port;
            const createdNote = await postNote(port, {message: "another test message", username: "another test user"});

            const recoveredNote = await request({
                uri: 'http://localhost:' + port + '/api/notes/' + createdNote.noteId,
                json: true
            });

            expect(recoveredNote).to.be.deep.equal(createdNote);
        });
    });

    describe('GET /api/notes', function () {
        it('should recover all notes', async () => {
            const port = app.serverConnection.address().port;
            const recoveredNotes = await request({
                uri: 'http://localhost:' + port +'/api/notes/',
                json: true
            });

            expect(recoveredNotes[0].message).equal("test message");
            expect(recoveredNotes[0].author).equal("test user");

            expect(recoveredNotes[1].message).equal("another test message");
            expect(recoveredNotes[1].author).equal("another test user");
        });
    });
});

function postNote(port, body) {
    return request({
        uri: 'http://localhost:' + port + '/api/notes',
        method: 'POST',
        body: body,
        json: true
    });
}