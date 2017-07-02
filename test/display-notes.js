'use strict';

const DisplayNotes = require('../usecases/notes/display-notes');
const Display = require('../web/rest-display');

const sinon = require('sinon');
const expect = require("chai").expect;

const noRepository = null;
const displayNotes = new DisplayNotes(noRepository);

describe('display notes', () => {

    const displayMock = { outputValidationError: () => {} };
    let outputValidationErrorSpy;

    describe("validates input on onNewNote",() => {
        beforeEach(() => outputValidationErrorSpy = sinon.spy(displayMock, "outputValidationError"));
        afterEach(() => displayMock.outputValidationError.restore());

        it("should reject null message", async () => {
            displayNotes.onNewNote(null, '::any name::', displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject undefined message", async () => {
            displayNotes.onNewNote(undefined, '::any name::', displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject null username", async () => {
            displayNotes.onNewNote('::any message::', null, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject undefined username", async () => {
            displayNotes.onNewNote('::any message::', undefined, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject both null", async () => {
            displayNotes.onNewNote('::any message::', undefined, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

        it("should reject both undefined", async () => {
            displayNotes.onNewNote('::any message::', undefined, displayMock);
            expect(outputValidationErrorSpy.calledOnce).to.be.equal(true);
        });

    });
});
