var express = require('express');
var router = express.Router();

router.get('/you-rang', (req, res) => {
    res.status(200).send({
        result: 'success',
        message: 'microsecond am up and running',
    });
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'second'});
});

module.exports = router;
