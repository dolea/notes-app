'use strict';

class RestDisplay {

    constructor(res) {
        this.res = res;
    }

    output(notes) {
        this.res.status(200).json(notes);
    }

    success() {
        this.res.status(200).send();
    }

    outputValidationError(errorMessage) {
        this.res.status(400).send(errorMessage);
    }
}

module.exports = RestDisplay;