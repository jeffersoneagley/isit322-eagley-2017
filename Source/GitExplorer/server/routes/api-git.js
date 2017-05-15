/*
 Data can be retrieved from the API either using callbacks (as in versions < 1.0)
 or using a new promise-based API. The promise-based API returns the raw Axios
 request promise.
 */
let express = require('express');
let router = express.Router();
let GitHub = require('github-api');

// unauthenticated client
let gh = {};

let createGist = function(response) {
    let gist = gh.getGist(); // not a gist yet
    gist.create({
        public: true,
        description: 'My first gist',
        files: {
            'file1.txt': {
                content: 'Aren\'t gists great!',
            },
        },
    }).then(({data}) => {
        // Promises!
        return gist.read();
    }).then(({data}) => {
        // do interesting things
        response.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        response.status(500).send(err);
    });
};

let getGistList = function(response) {
    gh.getUser().listGists().then(({data}) => {
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
            gh.getGist(request.body.id).read().then(({data}) => {
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
    let token = process.env.GITHUB_TOKEN;
    console.log(token);
    let password = process.env.GITHUB_PASSWORD;

    if (token !== undefined &&
        token !== '') {
        ghres = new GitHub({
            username: 'jefferson.eagley@gmail.com',
            token: process.env.GITHUB_TOKEN,
        });
    } else if (password !== undefined &&
        password !== '') {
        ghres = new GitHub({
            username: 'jefferson.eagley@gmail.com',
            password: process.env.GITHUB_PASSWORD,
        });
    } else {
        console.log('WARNING! process.env.GITHUB_TOKEN not configured');
    }
    return ghres;
};

router.get('/gistList', (request, response, next) => {
    console.log('gistList requested on server');
    // gh = getGitHub();
    console.log(gh);
    getGistList(response);
});

router.post('/getGistHeaderById', (request, response, next) => {
    console.log('getGistHeaderById requested on server');
    console.log(request.body);
    // gh = getGitHub();
    getGistById(request, response);
});

router.get('/createGist', (request, response, next) => {
    // let message = {'result': 'success', 'foo': 'bar', 'file': 'api.js'};
    console.log('createGist called on server');
    // gh = getGitHub();
    createGist(response);
    // response.status(200).send(gistResult);

});

router.get('/', (request, response, next) => {
    console.log('git base route called');
    response.send('<h2>git base route</h2>');
});

gh = getGitHub();

module.exports = router;
