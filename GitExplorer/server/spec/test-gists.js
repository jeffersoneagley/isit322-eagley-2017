/**
 * Created by fish on 5/18/17.
 */
let request = require('supertest');
let app = require('../app');
let routeNameGit = '/api/git';
let routeNameGist = routeNameGit + '/gist';
//let //loger = require('morgan')()

beforeAll(function(done) {
    setTimeout(done, 50);
});

it('gets the basic gists list', function(done) {
    request(app).get(routeNameGist + '/list').expect(200).expect('Content-Type', /json/).end(function(err, res) {
        if (err) {
            throw err;
        }
        done();
    });
});

it('checks the gist route response json has count field of type number', function(done) {
    request(app).
        get(routeNameGist + '/list').
        expect(200).
        expect('Content-Type', /json/).
        expect(function(response) {
            //loger.log(response.body);
            expect(typeof response.body.count).toBe('number');
            expect(typeof response.body.result).toBe('object');
        }).
        end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
});

it('checks the gist response gist 0 is correctly formatted', function(done) {
    request(app).
        get(routeNameGist + '/list').
        expect(200).
        expect('Content-Type', /json/).
        expect(function(response) {
            //loger.log(response.body.result[0]);
            console.log(response.body[0]);
            const gist = response.body.result[0];
            expect(gist.html_url).toBeDefined();
            expect(gist.id).toBeDefined();
            expect(gist.description).toBeDefined();
            expect(gist.git_pull_url).toBeDefined();
        }).
        end(function(err, res) {
            if (err) {
                throw err;
            }
            done();
        });
});
