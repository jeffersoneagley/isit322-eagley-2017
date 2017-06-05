/**
 * Created by fish on 5/16/17.
 */
function buildService(gh) {
    let express = require('express');
    let router = express.Router();

    let createGist = function(request, response) {
        try {
            // let docs = checkIsObject(request.body.docs);
            // let description = checkIsObject(request.body.description);
            let docs = request.body.docs;
            let description = request.body.description;
            console.log(docs);
            let gist = gh.getGist(); // not a gist yet
            gist.create({
                public: true,
                description: description || 'My new gist',
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
        } catch (exc) {
            console.log(exc);
        }
    };
    router.post('/', (request, response, next) => {
        console.log('gistList requested on server');
        createGist(request, response);
    });
    return router;
}

module.exports = buildService;

