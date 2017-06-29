'use strict';

const http = require('http');
const app = require('../web');
const expect = require("chai").expect;

//TODO: fix conflict with repository test (trying to open a mongo connection when already there is one)
describe('executes flow', function() {
    it('should show contact a form', (done) => {
        const options = {
            host: '127.0.0.1',
            port: 3000,
            path: '/api/notes',
            method: 'POST',
            body: '{"message": "test message", "username": "test user"}'
        };

        http.request(options, function(res) {
            expect(res.statusCode).to.be.equal(200);
            done();
        }).end();

    });
});