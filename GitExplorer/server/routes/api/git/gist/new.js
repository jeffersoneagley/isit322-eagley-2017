/**
 * Created by fish on 5/16/17.
 */
let express = require('express');
let router = express.Router();
let GitHub = require('github-api');

// unauthenticated client
let gh = new GitHub();

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

router.post('/', (request, response, next) => {
    console.log('gistList requested on server');
    gh = getGitHub();
    createGist(request, response);
});

module.exports = router;
