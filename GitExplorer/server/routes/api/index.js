let express = require('express');
let router = express.Router();
let Git = require('./git');
let Users = require('./users');
let morgan = require('morgan')('api-index');

/* GET home page. */
router.get('/foo', function(request, response, next) {
    let message = {'result': 'success', 'foo': 'bar', 'file': 'api.js'};
    // morgan('Foo called on server with message: ' + message);
    response.send(message);
});

router.use('/users', Users);

router.use('/git', Git);

router.get('/', (request, response, next) => {
    response.status(200).send('<p>this is an API</p>');
});

module.exports = router;
