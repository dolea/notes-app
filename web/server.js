'use strict';

const HTTP_SERVER_ERROR = 500;

const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes/api/index'));
app.use(function(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    console.log(err);

    return res.status(err.status || HTTP_SERVER_ERROR).send('Internal server error');
});

module.exports = app;