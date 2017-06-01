let express = require('express');
let router = express.Router();

router.all('*', (req, res, next) => {
    console.log('Markdown server ' + req.url);
    return next();
});

router.get('/you-rang/:id', function(req, res, next) {
    console.log('echoing params');
    console.log(req.params);
    let data = '';
    if (req.params.id) {
        data = req.params.id;
    }
    res.render('you-rang', {title: 'Markdown: You rang?', mirrorData: data});
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Markdown!',
        description: 'This is an API for converting a git ' +
        ' gist into a markdown document',
    });
});

module.exports = router;
