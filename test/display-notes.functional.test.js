'use strict';

const request = require('request-promise');
const App = require('../web');
const app = new App();
const expect = require("chai").expect;

describe('executes flow', function () {
    before(() => app.startApplicationWith({Port: 3000, DatabaseUrl: 'mongodb://localhost/kubide'}));
    after(() => app.stopApplication());

    describe('POST /api/notes', function () {
        it('should create a note', async () => {
            const createdNote = await postNote({message: "test message", username: "test user"});

            expect(createdNote.message).to.be.equal("test message");
            expect(createdNote.author).to.be.equal("test user");
        });
    });

    describe('GET /api/notes/:noteId', function () {
        it('should recover a created note', async () => {
            const createdNote = await postNote({message: "test message", username: "test user"});

            const recoveredNote = await request({
                uri: 'http://localhost:3000/api/notes/' + createdNote.noteId,
                json: true
            });

            expect(recoveredNote).to.be.deep.equal(createdNote);
        });
    });

    describe('GET /api/notes', function () {
        it('should recover all notes', async () => {
            const recoveredNotes = await request({
                uri: 'http://localhost:3000/api/notes/',
                json: true
            });

            //TODO: fix weak assertion
            expect(recoveredNotes).to.not.be.empty;
        });
    });
});

function postNote(body) {
    return request({
        uri: 'http://localhost:3000/api/notes',
        method: 'POST',
        body: body,
        json: true
    });
}