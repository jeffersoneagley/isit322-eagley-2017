/**
 * Created by fish on 5/16/17.
 */
let express = require('express');
let router = express.Router();
let List = require('./list');
let ById = require('./byId');
let CreateNew = require('./new');

router.use('/list', List);
router.use('/byId', ById);
router.use('/new', CreateNew);

router.get('/', (request, response, next) => {
    console.log('git base route called');
    response.send('<h2>git gist route</h2>');
});

module.exports = router;
