let express = require('express');
let router = express.Router();

let GitHub = require('../../../server/getGitHubAuth');
let List = require('./list')(GitHub);
let ById = require('./byId')(GitHub);
let CreateNew = require('./new')(GitHub);

router.all('*', (req, res, next) => {
    console.log('gist server ' + req.url);
    return next();
});

router.use('/list', List);
router.use('/byId', ById);
router.use('/new', CreateNew);
router.get('/you-rang/:id', function(req, res, next) {
    console.log('echoing params');
    console.log(req.params);
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

module.exports = router;
