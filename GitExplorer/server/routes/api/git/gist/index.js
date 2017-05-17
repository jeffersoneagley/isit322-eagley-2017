/**
 * Created by fish on 5/16/17.
 */
let express = require('express');
let router = express.Router();
let GitHub = require('github-api');
let List = require('./list');
let ById = require('./byId');
let CreateNew = require('./new');

router.use('/list', List);
router.use('/byId', ById);
router.use('/new', CreateNew);

// router.get('/list', (request, response, next) => {
//     console.log('gistList requested on server');
//     gh = getGitHub();
//     getGistList(response);
// });
//
// router.post('/byId', (request, response, next) => {
//     console.log('getGistHeaderById requested on server');
//     console.log(request.body);
//     gh = getGitHub();
//     getGistById(request, response);
// });
//
// router.post('/new', function(request, response, next) {
//     console.log('createGist called on server');
//     console.log(request.body);
//     gh = getGitHub();
//     createGist(request, response);
//     // response.status(200).send(gistResult);
//
// });

router.get('/', (request, response, next) => {
    console.log('git base route called');
    response.send('<h2>git gist route</h2>');
});

module.exports = router;
