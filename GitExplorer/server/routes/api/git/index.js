/*
 Data can be retrieved from the API either using callbacks (as in versions < 1.0)
 or using a new promise-based API. The promise-based API returns the raw Axios
 request promise.
 */
let express = require('express');
let router = express.Router();
let Gist = require('./gist');

router.use('/gist', Gist);

router.get('/', (request, response, next) => {
    console.log('git base route called');
    response.send('<h2>git base route</h2>');
});

module.exports = router;
