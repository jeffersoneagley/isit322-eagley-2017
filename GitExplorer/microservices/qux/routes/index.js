let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
    console.log('echoing params');
    console.log(req.params);
    let data = '';
    if (req.params.id) {
        data = req.params.id;
    }
    res.render('index', {title: 'Qux!', mirrorData: data});
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Qux!'});
});

module.exports = router;
