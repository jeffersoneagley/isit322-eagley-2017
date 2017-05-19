/**
 * Created by fish on 5/16/17.
 */

let express = require('express');
let router = express.Router();
let GitHub = require('github-api');

// EXISTING CODE OMITTED HERE
router.get('/', function(req, res, next) {
    let options = {
        // url    : 'https://api.bitbucket.org/2.0/users/jeffersoneagley',
        url: 'https://api.github.com/users/charliecalvert',
        headers: {
            'User-Agent': 'request',
        },
    };

    request(options, function(error, response, body) {
        // Print the error if one occurred
        console.log('error:', error);
        // Print the response status code if a response was received
        console.log('statusCode:', response && response.statusCode);
        // Print the HTML for the Google homepage.
        console.log('body:', body);
        res.send({error: error, response: response, body: body});
    });

});

// router.get('/', (request, response, next) => {
//     console.log('git base route called');
//     response.send('<h2>git base route</h2>');
// });

module.exports = router;
