let Index = (ApiEventCallback) => {
    const express = require('express');
    const router = express.Router();
    // const MicroServiceAddress = require('../../../config/microserviceAddresses.json');

    router.all('*', (req, res, next) => {
        console.log('socket server ' + req.url);
        return next();
    });

    router.post('/event', (req, res) => {
        try {
            console.log(req.body);
            onEventReceived(req);
        } catch (exc) {
            console.log(exc);
        }
        res.status(200).send('event recieved');
    });

    let processApiBodyToApiEventData = (ApiEventRequest) => {
        let ApiEventData = {
            apiUrl: ApiEventRequest.apiUrl || ' some broken route ',
            method: ApiEventRequest.method || ' unknown method ',
            ip: ApiEventRequest.ip || 'anonymous git-socket-index',
        };

        console.log('git-socket index:');
        console.log(ApiEventData);

        return ApiEventData;
    };

    let onEventReceived = (req) => {
        console.log('onEventRec');
        let ApiEventData = processApiBodyToApiEventData(req.body);
        ApiEventCallback(ApiEventData);
    };

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Socket demo server!'});
    });

    return router;
};

module.exports = Index;
