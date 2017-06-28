'use strict';

const DisplayNotesUseCase = require('../usecases/notes/display-notes');
const expect = require("chai").expect;


describe('display notes use case', () => {
    it('should call the repository to create a note', () => {
        new DisplayNotesUseCase(new FakeRepository()).onNewNote('::any message::', '::any username::', null);
    });

    it('should call the repository to retrieve a note', () => {
        new DisplayNotesUseCase(new FakeRepository()).byId('::any note id::', null);
    });

    it('should call the repository to retrieve bookmakrs', () => {
        new DisplayNotesUseCase(new FakeRepository()).bookmarkedBy('::any user::', null);
    });
});

//TODO: mock instead of fake
class FakeRepository {
    createNewNote(message, user) {
        expect(message).to.equal('::any message::');
        expect(user).to.equal('::any username::');
        return Promise.resolve({});
    }

    findNoteById(noteId) {
        expect(noteId).to.equal('::any note id::');
        return Promise.resolve({});
    }

    findBookmarkedNotesByCreatorId(username) {
        expect(username).to.equal('::any user::');
        return Promise.resolve({});
    }
}