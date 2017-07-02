'use strict';

const router = require('express').Router();

router.use('/:username/bookmarks', require('./bookmarks'));

module.exports = router;