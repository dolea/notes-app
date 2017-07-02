var router = require('express').Router({mergeParams: true});

router.use('/', require('./bookmarks'));

module.exports = router;