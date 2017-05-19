/**
 * Created by charlie on 10/7/15.
 */

let request = require('supertest');
let app = require('../app');
let fooRoute = '/api/foo';

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

    function doRouteReturnsTest(varName, val) {
        it('the json returned by ' + fooRoute + ' contains ' + varName + ': ' + val, function(done) {
            request(app).
                get(fooRoute).
                expect((response) => {
                    expect(response.body[varName]).toBe(val);
                }).
                expect(200).
                end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    }

    doRouteReturnsTest('foo', 'bar');
    doRouteReturnsTest('file', 'api.js');
});
