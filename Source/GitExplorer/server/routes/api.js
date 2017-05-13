let express = require('express');
let router = express.Router();
let request = require('request');
let GistTest = require('./api-git');

/* GET home page. */
router.get('/foo', function (request, response, next) {
    let message = {'result': 'success', 'foo': 'bar', 'file': 'api.js'};
    console.log('Foo called on server with message:', message);
    response.send(message);
});

// EXISTING CODE OMITTED HERE
router.get('/user', function (req, res, next) {
    let options = {
        // url    : 'https://api.bitbucket.org/2.0/users/jeffersoneagley',
        url    : 'https://api.github.com/users/charliecalvert',
        headers: {
            'User-Agent': 'request'
        }
    };

    request(options, function (error, response, body) {
        // Print the error if one occurred
        console.log('error:', error);
        // Print the response status code if a response was received
        console.log('statusCode:', response && response.statusCode);
        // Print the HTML for the Google homepage.
        console.log('body:', body);
        res.send({error: error, response: response, body: body});
    });

});
router.use('/git', GistTest);

router.get('/', (request, response, next) => {
    response.status(200).send('<p>this is an API</p>')
});


module.exports = router;