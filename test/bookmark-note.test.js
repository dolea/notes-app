'use strict';

const BookmarkNote = require('../usecases/notes/bookmark-note');

const sinon = require('sinon');
const expect = require("chai").expect;

const noRepository = null;
const bookmarkNote = new BookmarkNote(noRepository);

describe('display notes', () => {

    const displayMock = { outputValidationError: () => {} };
    let outputValidationErrorSpy;

    describe("validates input on bookmarkNote",() => {
        beforeEach(() => outputValidationErrorSpy = sinon.spy(displayMock, "outputValidationError"));
        afterEach(() => displayMock.outputValidationError.restore());

        it("should reject null username", async () => {
            bookmarkNote.bookmarkNote(null, '::any::', displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject undefined username", async () => {
            bookmarkNote.bookmarkNote(undefined, '::any::', displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject null noteId", async () => {
            bookmarkNote.bookmarkNote('::any::', null, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject undefined noteId", async () => {
            bookmarkNote.bookmarkNote('::any::', undefined, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject both null", async () => {
            bookmarkNote.bookmarkNote(null, null, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject both undefined", async () => {
            bookmarkNote.bookmarkNote(undefined, undefined, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });
    });
});
