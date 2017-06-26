var mongoose = require('mongoose');  
var NoteSchema = new mongoose.Schema({  
  message: String
});
mongoose.model('Note', NoteSchema);

module.exports = mongoose.model('Note');