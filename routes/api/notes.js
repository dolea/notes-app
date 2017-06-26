'use strict';

let router = require('express').Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
let NotesUseCase = require(__base + '/domain/usecases/NotesUseCase');
let NoteRepository = require(__base + '/note-repository/NoteRepository');

const useCase = new NotesUseCase(new NoteRepository());

// api/notes
router.post('/', function(req, res) {
    useCase.onNewNote({"message" : req.body.message});
  //TODO: handle error case
  res.status(200).send();
});

// api/notes
router.get('/', function(req, res) {
    useCase.findAllNotes()
        .then(allNotes => res.status(200).send(allNotes))
        //TODO: delegate this logic to the use case, most likely
        .catch(error => res.status(500).send("An error occurred " + error));
});

module.exports = router;