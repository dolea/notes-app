var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
var Note = require('../../note-repository/note');

// api/notes
router.post('/', function(req, res) {
  Note.create({
            message : req.body.message,
        }, 
        function (err, note) {
            if (err) return res.status(500).send("There was a problem adding the note to the database.");
            res.status(200).send(note);
        });
});

// api/notes
router.get('/', function(req, res) {
  Note.find({}, function (err, notes) {
        if (err) return res.status(500).send("There was a problem finding the notes.");
        res.status(200).send(notes);
    });
});

module.exports = router;