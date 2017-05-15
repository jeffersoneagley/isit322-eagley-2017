/*
 Data can be retrieved from the API either using callbacks (as in versions < 1.0)
 or using a new promise-based API. The promise-based API returns the raw Axios
 request promise.
 */
let express = require('express');
let router = express.Router();
let GitHub = require('github-api');

// unauthenticated client
let gh = new GitHub();

let checkIsObject = function(input) {
    return typeof (input) === 'string' ? JSON.parse(input) : input;
};

let createGist = function(request, response) {
    let docs = checkIsObject(request.body.docs);
    let desc = checkIsObject(request.body.doc);
    let gist = gh.getGist(); // not a gist yet
    gist.create({
        public: true,
        description: desc || 'My new gist',
        files: docs,
    }).then(function({data}) {
        // Promises!
        return gist.read();
    }).then(function({data}) {
        // do interesting things
        response.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        response.status(500).send(err);
    });
};

let getGistList = function(response) {
    gh.getUser().listGists().then(function({data}) {
        // Promises!
        response.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        response.status(500).send(err);
    });
};

let getGistById = function(request, response) {
    try {
        if (request.body.id !== undefined) {
            console.log(request.body.id);
            gh.getGist(request.body.id).read().then(function({data}) {
                console.log(data);
                response.status(200).send(data);
            }).catch((err) => {
                console.log(err);
                response.status(500).send(err);
            });

        } else {
            response.status(401).send('invalid data');
        }
    } catch (exc) {
        console.log(exc);
    }
};

// basic auth
let getGitHub = function() {
    let ghres = {};
    if (process.env.GITHUB_TOKEN !== '') {
        ghres = new GitHub({
            username: 'jefferson.eagley@gmail.com',
            token: process.env.GITHUB_TOKEN,
        });
    } else {
        ghres = new GitHub({
            username: 'jefferson.eagley@gmail.com',
            password: process.env.GITHUB_PASSWORD,
        });
    }
    return ghres;
};

router.get('/gistList', (request, response, next) => {
    console.log('gistList requested on server');
    gh = getGitHub();
    getGistList(response);
});

router.post('/getGistHeaderById', (request, response, next) => {
    console.log('getGistHeaderById requested on server');
    console.log(request.body);
    gh = getGitHub();
    getGistById(request, response);
});

router.post('/createGist', function(request, response, next) {
    console.log('createGist called on server');
    console.log(request.body);
    gh = getGitHub();
    createGist(request, response);
    // response.status(200).send(gistResult);

});

router.get('/', (request, response, next) => {
    console.log('git base route called');
    response.send('<h2>git base route</h2>');
});

module.exports = router;
