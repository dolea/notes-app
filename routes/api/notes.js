'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

const NotesUseCase = require(__base + '/domain/usecases/NotesUseCase');
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