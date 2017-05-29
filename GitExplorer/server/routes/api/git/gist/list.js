/**
 * Created by fish on 5/16/17.
 */
let express = require('express');
let router = express.Router();
// let GitHub = require('github-api');
let getGitHubAuth = require('../../getGitHubAuth');

let getGistFiles = function(files) {
    let result = {};

    for (let i in files) {
        if (files.hasOwnProperty(i)) {
            let f = files[i];
            result[i] = {
                filename: f.filename,
                type: f.type,
            };
        }
    }

    return result;
};

let getGistList = function(res) {
    console.log(res);
    getGitHubAuth().getUser().listGists().then(({data}) => {
        // Promises!
        console.log(data);

        const result = data.map((gist) => {
            return {
                id: gist.id,
                url: gist.url,
                html_url: gist.html_url,
                description: gist.description,
                git_pull_url: gist.git_pull_url,
                files: getGistFiles(gist.files),
                created_at: gist.created_at,
                updated_at: gist.updated_at,
            };
        });

        res.status(200).send({
            count: result.length,
            result: result,
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
};

router.get('/', (request, response) => {
    console.log('gistList requested on server');
    getGistList(response);
});

module.exports = router;
