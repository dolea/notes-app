'use strict';

class RestDisplay {

    constructor(res) {
        this.res = res;
    }

    output(notes) {
        this.res.status(200).send(notes);
    }

    outputError(error) {
        this.res.status(500).send("An error occurred " + error);
    }
}

module.exports = RestDisplay;