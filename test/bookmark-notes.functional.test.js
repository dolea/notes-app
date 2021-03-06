'use strict';

const request = require('request-promise');
const expect = require("chai").expect;
const cleanCollections = require("./collection-cleaner");

const Application = require('../web');
const app = new Application();

describe('executes bookmark flow', function () {
    before(() => app.startApplicationWith({port: 0, databaseUrl: 'mongodb://localhost/test-bookmark-notes-functional'}));
    after(() => app.stopApplication(cleanCollections));

    let createdNote;
    const userId = 'test-user';
    describe('POST api/users/:userId/bookmarks/:noteId', function () {
        it('should bookmark a created note', async () => {
            const port = app.serverConnection.address().port;
            createdNote = await request({
                uri: 'http://localhost:' + port + '/api/notes',
                method: 'POST',
                body: {message: 'any', username: 'any'},
                json: true
            });

            await request({
                uri: 'http://localhost:' + port + '/api/users/' + userId + '/bookmarks/' + createdNote.noteId,
                method: 'POST'
            });
        });
    });

    describe('GET /api/users/:userId/bookmarks', function () {
        it('should recover a bookmarked note', async () => {
            const port = app.serverConnection.address().port;
            const recoveredNotes = await request({
                uri: 'http://localhost:' + port + '/api/users/' + userId + '/bookmarks',
                json: true
            });

            expect(recoveredNotes[0]).to.be.deep.equal(createdNote);
        });
    });
});