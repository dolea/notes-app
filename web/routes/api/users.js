'use strict';

const router = require('express').Router();
const BookmarkNoteUseCase = require(__base + '/usecases/notes/bookmark-note');
const BookmarkRepository = require(__base + '/repository/mongo/bookmarks-repository');
const NoteRepository = require(__base + '/repository/mongo/note-repository');
const DisplayNotesUseCase = require(__base + '/usecases/notes/display-notes');
const Display = require(__base + '/usecases/Display');

const bookmark = new BookmarkNoteUseCase(new BookmarkRepository());
const displayNotes = new DisplayNotesUseCase(new NoteRepository());

// api/users/:username/bookmarks/:noteId
router.post('/:username/bookmarks/:noteId', function(req, res) {
    bookmark.bookmarkNote(req.params.username, req.params.noteId);
    //TODO: handle error case
    res.status(200).send();
});

// api/users/:username/bookmarks
router.get('/:username/bookmarks', function(req, res) {
    displayNotes.bookmarkedBy(req.params.username, new Display(res));
});

module.exports = router;