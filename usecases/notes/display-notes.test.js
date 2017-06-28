'use strict';

const DisplayNotesUseCase = require('./display-notes');
const NotesRepository = require('../../repository/mongo/note-repository');
const sinon = require('sinon');
const expect = require("chai").expect;


describe('display notes use case', () => {
    it('should do anything', () => {
        new DisplayNotesUseCase(new FakeRepository()).onNewNote('::any message::', '::any username::', null);
    })
});

class FakeRepository {
    createNewNote(message, user) {
        expect(message).to.equal('::any message::');
        expect(user).to.equal('::any username::');
        return Promise.resolve({});
    }
}