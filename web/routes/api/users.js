'use strict';

const router = require('express').Router();
const BookmarkNoteUseCase = require('../../../usecases/notes/bookmark-note');
const BookmarkRepository = require('../../../repository/mongo/bookmarks-repository');
const NoteRepository = require('../../../repository/mongo/note-repository');
const DisplayNotesUseCase = require('../../../usecases/notes/display-notes');
const Display = require('../../rest-display');

const bookmark = new BookmarkNoteUseCase(new BookmarkRepository());
const displayNotes = new DisplayNotesUseCase(new NoteRepository());

// api/users
router.post('/:username/bookmarks/:noteId', function(req, res, next) {
    bookmark.bookmarkNote(req.params.username, req.params.noteId)
        .then(() => res.status(200).send())
        .catch(e => next(e));
});

// api/users
router.get('/:username/bookmarks', function(req, res, next) {
    displayNotes.bookmarkedBy(req.params.username, new Display(res)).catch(e => next(e));
});

module.exports = router;