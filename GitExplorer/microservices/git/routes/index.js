let express = require('express');
let router = express.Router();
let getGitHub = require('../../../server/getGitHubAuth');
let checkIsObject = require('./checkIsObject');
let MicroServiceAddressUtility = require('../../../config/microserviceAddressesUtility.js');
let proxy = require('http-proxy-middleware');

router.all('*', (req, res, next) => {
    console.log('git server ' + req.url);
    return next();
});
// restream parsed body before proxying
let restream = function(proxyReq, req, res, options) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
};

router.use('/gist', proxy({
    target: MicroServiceAddressUtility.getAddress('gist'),
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
        '^/git': '',           // remove base path,
        '^/gist': ''           // remove base path
    },
    onProxyReq: restream,
}));

/* GET home page. */
router.get('/you-rang/:id', function(req, res, next) {
    console.log('echoing params');
    console.log(req.params);
    let data = '';
    if (req.params.id) {
        data = req.params.id;
    }
    res.render('index', {title: 'You rang? git', mirrorData: data});
});

router.get('/user', (req, res, next) => {
    try {
        let gh = getGitHub();
        gh.getUser().getProfile().then((data) => {
            let user = checkIsObject(data);
            console.log(user.data.url);
            res.status(200).send({body: user.data});
        }).catch((err) => {
            res.status(500).send({error: err});
        });

    } catch (exc) {
        console.log(exc);
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Qux!'});
});

module.exports = router;
