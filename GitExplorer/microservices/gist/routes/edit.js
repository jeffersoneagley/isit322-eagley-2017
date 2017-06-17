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

    let checkHasGistInBody = (req) => {
        console.log('checkHasGistInBody');
        let result = new Promise((resolve, reject) => {
                console.log('promise built');
                try {
                    if (req.body !== undefined) {
                        //check for strings
                        let body = typeof (req.body) === 'string' ? JSON.parse(req.body) : req.body;
                        console.log('has body is object');
                        (body.gistId !== undefined) || reject('no gist ID supplied');
                        (body.gist !== undefined) || reject('no gist body supplied');
                        (body.gist.id !== undefined) || reject('improper gist body supplied');
                        console.log('gist approved', body.gistId);
                        resolve(body.gist);
                    } else {
                        console.log('no body');
                        reject(
                            'no body in request',
                        );
                    }
                }
                catch (exc) {
                    console.log(exc);
                    reject(exc.message);
                }
            },
            )
        ;
        return result;
    };

    let updateGistById = (gist, req, res) => {
        gh.getGist(gist.id).update(gist).then(function({data}) {
            console.log(data);
            res.status(200).send(data);
        }).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
    };

    router.post('/update', (req, res) => {
        console.log('gist update for editor requested on server');
        checkHasGistInBody(req).then((gist) => {
            console.log('attempting to update gist');
            updateGistById(gist, req, res);
        }).catch((ex) => {
            console.log(ex);
            res.status(401).send('Please attach a valid gist');
        });
    });

    // router.get('/:id', (request, response) => {
    //     console.log('gist data for editor requested on server via get');
    //     getGistById(request.params.id, request, response);
    // });
    //
    // router.post('/', (request, response, next) => {
    //     console.log('gist data for editor requested on server via post');
    //     getGistById(request.body.gistId, request, response);
    // });
    return router;
}

module.exports = buildService;
