let Index = () => {

    const express = require('express');
    const router = express.Router();
    const MicroServiceAddressesUtility = require('../../../config/microserviceAddressesUtility');
    const requester = require('request');

    const GitHub = require('../../../server/getGitHubAuth');
    const gh = GitHub();
    const List = require('./list')(gh);
    const ById = require('./byId')(gh);
    const CreateNew = require('./new')(gh);

    router.all('*', (req, res, next) => {
        console.log('gist server ' + req.url);
        return next();
    });

    router.all('*', reportApiActionToSocketServer);

    router.use('/list', List);
    router.use('/byId', ById);
    router.use('/new', CreateNew);
    router.get('/you-rang/:id', function(req, res, next) {
        // console.log('echoing params');
        // console.log(req.params);
        let data = '';
        if (req.params.id) {
            data = req.params.id;
        }
        res.render('index', {title: 'You rang?', mirrorData: data});
    });

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Gist!'});
    });

    function reportApiActionToSocketServer(req, res, next) {
        console.log('Logging %s API call to socket server', req.originalUrl);
        let ApiEventData = {
            ip: req.ip || 'anonymous git-socket',
            method: req.method,
            apiUrl: req.originalUrl,
        };
        requester(
            {
                method: 'POST',
                uri: MicroServiceAddressesUtility.getAddress('git-socket') + '/event',
                'content-type': 'application/json',
                json: ApiEventData,
            },
        );
        next();
    }

    return router;
};
module.exports = Index();
