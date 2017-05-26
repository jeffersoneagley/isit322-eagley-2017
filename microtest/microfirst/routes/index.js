var express = require('express');
var router = express.Router();

router.get('/you-rang', (req, res) => {
    res.status(200).send({
        result: 'success',
        message: 'microfirst am up and running',
    });
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
