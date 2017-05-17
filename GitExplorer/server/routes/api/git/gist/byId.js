/**
 * Created by fish on 5/16/17.
 */
let express = require('express');
let router = express.Router();
let GitHub = require('github-api');

// unauthenticated client
let gh = new GitHub();

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

router.post('/', (request, response, next) => {
    console.log('gistList requested on server');
    gh = getGitHub();
    getGistById(request, response);
});

module.exports = router;
