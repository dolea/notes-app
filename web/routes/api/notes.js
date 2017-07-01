'use strict';

const router = require('express').Router();
const DisplayNotesUseCase = require('../../../usecases/notes/display-notes');
const NoteRepository = require('../../../repository/mongo/note-repository');
const Display = require('../../rest-display');

const displayNote = new DisplayNotesUseCase(new NoteRepository());

// api/notes
router.post('/', function(req, res, next) {
    displayNote.onNewNote(req.body.message, req.body.username, new Display(res)).catch(e => next(e));
});

// api/notes
router.get('/', function(req, res, next) {
    displayNote.allNotes(new Display(res)).catch(e => next(e));
});

// api/notes/:noteId
router.get('/:noteId', function(req, res, next) {
    displayNote.byId(req.params.noteId, new Display(res)).catch(e => next(e));
});

module.exports = router;