
var app = require('./app');
var port = process.env.PORT || 3000;
global.__base = __dirname + '/';

// anything beginning with "/api" will go into this
app.use('/api', require('./routes/api'));

app.listen(3000);