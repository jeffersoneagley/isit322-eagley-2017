/**
 * Created by fish on 6/14/17.
 */


function buildService(gh) {

    let express = require('express');
    let router = express.Router();

    // let getGistById = function(gistId, request, response) {
    //     console.log(gistId);
    //     try {
    //         if (gistId !== undefined) {
    //             console.log(gistId);
    //             gh.getGist(gistId).read().then(function({data}) {
    //                 console.log(data);
    //                 response.status(200).send(data);
    //             }).catch((err) => {
    //                 console.log(err);
    //                 response.status(500).send(err);
    //             });
    //
    //         } else {
    //             response.status(401).send('invalid data');
    //         }
    //     } catch (exc) {
    //         console.log(exc);
    //     }
    // };

    let updateGistById = (gist, req, res) => {
        gh.getGist(gist.id).update(gist).then(function({data}) {
            console.log(data);
            response.status(200).send(data);
        }).catch((err) => {
            console.log(err);
            response.status(500).send(err);
        });
    };

    router.post('/update', (req, res) => {
        console.log('gist update for editor requested on server');
        checkHasGistInBody(req).then((gist) => {
            updateGistById(gist, req, res);
        }).catch((ex) => res.status(401).send('Please attach a valid gist'));
    });

    router.get('/:id', (request, response) => {
        console.log('gist data for editor requested on server via get');
        getGistById(request.params.id, request, response);
    });

    router.post('/', (request, response, next) => {
        console.log('gist data for editor requested on server via post');
        getGistById(request.body.gistId, request, response);
    });
    return router;
}

module.exports = buildService;
