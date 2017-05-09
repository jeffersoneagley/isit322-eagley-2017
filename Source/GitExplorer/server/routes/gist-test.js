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

let createGist = function (response) {
    let gist = gh.getGist(); // not a gist yet
    let result = {};
    gist.create({
        public     : true,
        description: 'My first gist',
        files      : {
            "file1.txt": {
                content: "Aren't gists great!"
            }
        }
    }).then(function ({data}) {
        // Promises!
        let createdGist = data;
        return gist.read();
    }).then(function ({data}) {
        let retrievedGist = data;
        // do interesting things
        response.status(200).send(retrievedGist);
    }).catch((err) => {
        console.log(err);
        result = err;
    });
};

// basic auth
let getGitHub = function () {
    let ghres = {};
    if (process.env.GITHUB_TOKEN !== '') {
        ghres = new GitHub({
            username: 'jefferson.eagley@gmail.com',
            token   : process.env.GITHUB_TOKEN
        });
    } else {
        ghres = new GitHub({
            username: 'jefferson.eagley@gmail.com',
            password: process.env.GITHUB_PASSWORD
        });
    }
    return ghres;
};

router.get('/createGist', function (request, response, next) {
    // let message = {'result': 'success', 'foo': 'bar', 'file': 'api.js'};
    console.log('createGist called on server with');
    gh = getGitHub();
    createGist(response);
    // response.status(200).send(gistResult);

});

router.get('/', (request, response, next) => {
    console.log('git base route called');
    response.send('<h2>git base route</h2>');
});

module.exports = router;