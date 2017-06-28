'use strict';

const router = require('express').Router();
const BookmarkNoteUseCase = require(__base + '/usecases/notes/bookmark-note');
const BookmarkRepository = require(__base + '/repository/mongo/bookmarks-repository');
const NoteRepository = require(__base + '/repository/mongo/note-repository');
const DisplayNotesUseCase = require(__base + '/usecases/notes/display-notes');
const Display = require(__base + '/usecases/Display');

const bookmark = new BookmarkNoteUseCase(new BookmarkRepository());
const displayNotes = new DisplayNotesUseCase(new NoteRepository());

// api/users
router.post('/:username/bookmarks/:noteId', function(req, res) {
    bookmark.bookmarkNote(req.params.username, req.params.noteId)
        .then(() => res.status(200).send())
        .catch((error) => res.status(500).send(error));
});

// api/users
router.get('/:username/bookmarks', function(req, res) {
    displayNotes.bookmarkedBy(req.params.username, new Display(res));
});

module.exports = router;