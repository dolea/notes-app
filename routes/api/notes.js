var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
var CreateNote = require(__base + '/domain/usecases/createNote');

// api/notes
router.post('/', function(req, res) {
  new CreateNote().onNote({"message" : req.body.message});
  //TODO: handle error case
  res.status(200).send();
});

// api/notes
router.get('/', function(req, res) {
    var DbNote = require(__base + '/note-repository/note');

  DbNote.find({}, function (err, notes) {
        if (err) return res.status(500).send("There was a problem finding the notes.");
        res.status(200).send(notes);
    });
});

module.exports = router;