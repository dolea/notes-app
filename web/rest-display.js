'use strict';

class RestDisplay {

    constructor(res) {
        this.res = res;
    }

    output(notes) {
        this.res.status(200).send(notes);
    }
}

module.exports = RestDisplay;