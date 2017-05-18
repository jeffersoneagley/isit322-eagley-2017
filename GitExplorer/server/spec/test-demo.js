/**
 * Created by charlie on 10/7/15.
 */

let request = require('supertest');
let app = require('../app');

describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    it('expects true to be true (test system can prove true)', function() {
        expect(true).toBe(true);
    });

    it('expects false to be false (test system can prove false)', function() {
        expect(false).toBe(false);
    });

    it('get the foo route', function(done) {
        request(app).get('/api/foo').expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
    });

});
