'use strict';

const BookmarkNoteUseCase = require('../usecases/notes/bookmark-note');
const expect = require("chai").expect;


describe('BookmarkNoteUseCase', () => {
    it('should call the repository to create a bookmark', async () => {
        return await new BookmarkNoteUseCase(new FakeRepository()).bookmarkNote('::any note id::', '::any username::');
    });
});

//TODO: mock instead of fake
class FakeRepository {
    addBookmarkedNote(noteId, user) {
        expect(noteId).to.equal('::any note id::');
        expect(user).to.equal('::any username::');
        return Promise.resolve({});
    }
}