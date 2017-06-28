'use strict';

const router = require('express').Router();
const BookmarkUseCase = require(__base + '/bookmarks/bookmarks-use-case');
const BookmarkRepository = require(__base + '/note-repository/bookmarks-repository');
const Display = require(__base + '/Display');

const useCase = new BookmarkUseCase(new BookmarkRepository());

// api/users/:username/bookmarks/:noteId
router.post('/:username/bookmarks/:noteId', function(req, res) {
    useCase.bookmarkNote(req.params.username, req.params.noteId);
    //TODO: handle error case
    res.status(200).send();
});

// api/users/:username/bookmarks
router.get('/:username/bookmarks', function(req, res) {
    useCase.displayBookmarks(req.params.username, new Display(res));
});

module.exports = router;