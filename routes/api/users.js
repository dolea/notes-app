'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const BookmarkUseCase = require(__base + '/domain/usecases/BookmarkUseCase');
const BookmarkRepository = require(__base + '/note-repository/BookmarkRepository');
const Display = require(__base + '/Display');

// api/users/:username/notes
router.post('/:username/bookmarks/:noteId', function(req, res) {
    const useCase = new BookmarkUseCase(new BookmarkRepository(), null);
    useCase.bookmarkNote(req.params.noteId, req.params.username);
    //TODO: handle error case
    res.status(200).send();
});

module.exports = router;