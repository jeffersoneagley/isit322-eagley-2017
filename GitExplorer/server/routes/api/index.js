let express = require('express');
let router = express.Router();
let Git = require('./git');
let Users = require('./users');
let morgan = require('morgan')('api-index');
let requester = require('request');
let serverConfig = require('../../../config/microserviceAddresses.json');

/* GET home page. */
router.get('/foo', function(request, response, next) {
    let message = {'result': 'success', 'foo': 'bar', 'file': 'api.js'};
    // morgan('Foo called on server with message: ' + message);
    response.send(message);
});

getAddress = (serverName) => {
    return serverConfig[serverName].url ||
        'http://localhost:' + serverConfig[serverName].port;
};

router.use('/user', Users);

router.use('/git', Git);

router.get('/qux', (req, res) => {
    requester(getAddress('qux')).pipe(res);
});

router.get('/', (request, response, next) => {
    response.status(200).send('<p>this is an API</p>');
});

module.exports = router;
