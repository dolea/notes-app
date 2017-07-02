'use strict';

const router = require('express').Router({mergeParams: true});

router.use('/:username/bookmarks', require('./bookmarks'));

module.exports = router;