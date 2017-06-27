'use strict';

const router = require('express').Router();

const BookmarkUseCase = require(__base + '/bookmarks/bookmarks-use-case');
const BookmarkRepository = require(__base + '/note-repository/bookmarks-repository');
const Display = require(__base + '/Display');

// api/users/:username/notes
router.post('/:username/bookmarks/:noteId', function(req, res) {
    const useCase = new BookmarkUseCase(new BookmarkRepository(), null);
    useCase.bookmarkNote(req.params.noteId, req.params.username);
    //TODO: handle error case
    res.status(200).send();
});

module.exports = router;