'use strict'

//TODO: inject collaborators
var DbNote = require(__base + '/note-repository/note');

function CreateNote() {

}

CreateNote.prototype.onNote = function(note) {
	DbNote.create({
            message : note.message,
        }, 
        function (err, note) {
            //TODO: return or handle
            console.log(note);
        });
	return;
};

module.exports = CreateNote;