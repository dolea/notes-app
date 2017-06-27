'use strict';

const router = require('express').Router();

const NotesUseCase = require(__base + '/notes/NotesUseCase');
const NoteRepository = require(__base + '/note-repository/NoteRepository');
const Display = require(__base + '/Display');


// api/notes
router.post('/', function(req, res) {
    const useCase = new NotesUseCase(new NoteRepository(), null);
    useCase.onNewNote(req.body.message, req.body.username);
  //TODO: handle error case
  res.status(200).send();
});

// api/notes
router.get('/', function(req, res) {
    const useCase = new NotesUseCase(new NoteRepository(), new Display(res));
    useCase.displayAllNotes();
});

module.exports = router;