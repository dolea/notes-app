var router = require('express').Router();

router.use('/', require('./bookmarks'));

module.exports = router;