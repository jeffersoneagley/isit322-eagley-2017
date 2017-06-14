/**
 * Created by fish on 5/16/17.
 */

function buildService(gh) {

    let express = require('express');
    let router = express.Router();

    let gistsToSend = {};

    let removeGistFromGistsToSend = (gistId) => {
        if (gistsToSend[gistId] !== undefined) {
            delete gistsToSend[gistId];
        }
    };

    let onJobComplete = (req, res) => {
        let jobStatistics = {
            totals: {
                gistsProcessed: 0,
                successes: 0,
                failures: 0,
            },
            gists: [],
        };
        for (let gistId in gistsToSend) {
            if (gistsToSend.hasOwnProperty(gistId)) {
                (gistsToSend[gistId].success) ? jobStatistics.totals.successes++ : jobStatistics.totals.failures++;
                jobStatistics.totals.gistsProcessed++;
                jobStatistics.gists.push(gistId);
                removeGistFromGistsToSend(gistId);
            }
        }
        console.log('job stats');
        console.log(jobStatistics);
        res.status(200).send(JSON.stringify(jobStatistics));

    };

    let checkForJobComplete = (req, res) => {
        let allFinished = true;
        for (let gistId in gistsToSend) {
            if (gistsToSend.hasOwnProperty(gistId)) {
                if (!gistsToSend[gistId].finished) {
                    allFinished = false;
                    break;
                }
            }
        }
        if (allFinished) {
            onJobComplete(req, res);
        }

    };

    let deleteGistById = function(gistId, request, response) {
        try {
            if (gistId !== undefined) {
                console.log(gistId);
                gh.getGist(gistId).delete((err, result, req) => {
                    console.log('err');
                    console.log(err);
                    gistsToSend[gistId] = {
                        finished: true, success: result, error: err,
                    };
                    checkForJobComplete(request, response);
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

    let deleteGistsFromList = (list, req, res) => {
        //split into 2 loops on purpose
        //this is done to require the joblist be populated before any checks for completion fire
        for (let gistId in list) {
            if (list.hasOwnProperty(gistId)) {
                gistsToSend[gistId] = {
                    finished: false,
                };
            }
        }
        for (let gistId in list) {
            if (list.hasOwnProperty(gistId)) {
                deleteGistById(gistId, req, res);
            }
        }
    };

    router.post('/', (request, response) => {
        console.log(request.body);
        deleteGistsFromList(request.body, request, response);
        // deleteGistById(request.params.id, request, response);
    });

    router.get('/', (request, response, next) => {
        response.render('index', {title: 'delete gist api node'});
    });
    return router;
}

module.exports = buildService;
