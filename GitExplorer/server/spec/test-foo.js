/**
 * Created by charlie on 10/7/15.
 */

let request = require('supertest');
let app = require('../app');
let fooRoute='/api/foo'

describe('get Foo functionality', function() {

    'use strict';

    it('expects true to be true (test system can prove true)', function() {
        expect(true).toBe(true);
    });

    it('foo route returns successful', function(done) {
        request(app).get(fooRoute).expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
    });

    it('get the foo route', function(done) {
        request(app).get(fooRoute).expect(200).expect('Content-Type', /json/).end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
    });

});
