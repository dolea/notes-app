'use strict';

const router = require('express').Router();
const DisplayNotesUseCase = require(__base + '/libs/notes/display-notes');
const NoteRepository = require(__base + '/repository/mongo/note-repository');
const Display = require(__base + '/libs/Display');

const displayNote = new DisplayNotesUseCase(new NoteRepository());

// api/notes
router.post('/', function(req, res) {
    displayNote.onNewNote(req.body.message, req.body.username, new Display(res));
});

// api/notes
router.get('/', function(req, res) {
    displayNote.allNotes(new Display(res));
});

// api/notes/:noteId
router.get('/:noteId', function(req, res) {
    displayNote.byId(req.params.noteId, new Display(res));
});

module.exports = router;