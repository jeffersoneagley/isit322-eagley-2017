let express = require('express');
let router = express.Router();

router.all('*', (req, res, next) => {
    console.log('socket server ' + req.url);
    return next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Socket demo server!'});
});

module.exports = router;
