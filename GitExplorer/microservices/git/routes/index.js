let express = require('express');
let router = express.Router();
let getGitHub = require('./getGitHubAuth');
let requester = require('request');

/* GET home page. */
router.get('you-rang/:id', function(req, res, next) {
    console.log('echoing params');
    console.log(req.params);
    let data = '';
    if (req.params.id) {
        data = req.params.id;
    }
    res.render('index', {title: 'Qux!', mirrorData: data});
});

router.all('/gist',(req, res, next)=>{
    requester()
})

router.get('/user', (req, res, next) => {
    // try {
    //     let gh = getGitHub();
    //     gh.getUser().getProfile().then((data) => {
    //         let user = checkIsObject(data);
    //         console.log(user.data.url);
    //         res.status(200).send({body: user.data});
    //     }).catch((err) => {
    //         res.status(500).send({error: err});
    //     });
    //
    // } catch (exc) {
    //     console.log(exc);
    // }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Qux!'});
});

module.exports = router;
