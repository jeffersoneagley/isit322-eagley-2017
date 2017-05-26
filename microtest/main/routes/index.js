let express = require('express');
let router = express.Router();
const requester = require('request');

router.get('/you-rang', (req, res) => {
    res.status(200).send({
        result: 'success',
        message: 'microtest am up and running',
    });
});

router.get('/microfirst', (req, res) => {
    requester('http://localhost:30021/you-rang').pipe(res);
});

router.get('/microsecond', (req, res) => {
    requester('http://localhost:30022/you-rang').pipe(res);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
