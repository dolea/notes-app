'use strict';

const router = require('express').Router();
const BookmarkUseCase = require(__base + '/bookmarks/bookmarks-use-case');
const BookmarkRepository = require(__base + '/repository/bookmarks-repository');
const NoteRepository = require(__base + '/repository/note-repository');
const DisplayNotesUseCase = require(__base + '/notes/display-notes');
const Display = require(__base + '/Display');

const useCase = new BookmarkUseCase(new BookmarkRepository());
const displayNotes = new DisplayNotesUseCase(new NoteRepository());

// api/users/:username/bookmarks/:noteId
router.post('/:username/bookmarks/:noteId', function(req, res) {
    useCase.bookmarkNote(req.params.username, req.params.noteId);
    //TODO: handle error case
    res.status(200).send();
});

// api/users/:username/bookmarks
router.get('/:username/bookmarks', function(req, res) {
    displayNotes.bookmarkedBy(req.params.username, new Display(res));
});

module.exports = router;