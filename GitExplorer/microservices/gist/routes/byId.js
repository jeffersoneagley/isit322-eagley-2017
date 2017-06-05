/**
 * Created by fish on 5/16/17.
 */

function buildService(gh) {

    let express = require('express');
    let router = express.Router();

    let getGistById = function(gistId, request, response) {
        try {
            if (gistId !== undefined) {
                console.log(gistId);
                gh.getGist(gistId).read().then(function({data}) {
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

    router.get('/:id', (request, response) => {
        getGistById(request.params.id, request, response);
    });

    router.post('/', (request, response, next) => {
        console.log('gistList requested on server');
        getGistById(request.body.id, request, response);
    });
    return router;
}

module.exports = buildService;
