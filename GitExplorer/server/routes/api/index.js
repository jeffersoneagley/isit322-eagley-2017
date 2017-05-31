let express = require('express');
let router = express.Router();
let Git = require('./git');
let Users = require('./users');
let morgan = require('morgan')('api-index');
let requester = require('request');
let serverConfig = require('../../../config/microserviceAddressesUtility');

/* GET home page. */
router.get('/foo', function(request, response, next) {
    let message = {'result': 'success', 'foo': 'bar', 'file': 'api.js'};
    // morgan('Foo called on server with message: ' + message);
    response.send(message);
});

router.use('/user', Users);

// router.use('/git', Git);
router.all('/git', (req, res) => {
    requester(serverConfig.getAddress('git'), {
        followAllRedirects: true,
    }).pipe(res);
});

router.get('/qux/:data', (req, res) => {
    console.log(req.params);
    requester(serverConfig.getAddress('qux') + '/' + req.params.data).pipe(res);
});

router.get('/', (request, response, next) => {
    response.status(200).send('<p>this is an API</p>');
});

module.exports = router;
