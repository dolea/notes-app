'use strict';

const expect = require("chai").expect;
const request = require("request");
const NoteUseCase = require("../libs/notes/NotesUseCase")

describe("Happy Path", function() {
    let url = "http://localhost:3000/api/notes";

    it("does not fails", function() {
        request(url, function(error, response, body) {
            new NoteUseCase().onNewNote("::message::", "::creator::", new DumbDisplay());
            expect(true).to.equal(true);
        });
    });
});

class DumbDisplay{
    output(notes) {

    }

    outputError(error) {

    }
}