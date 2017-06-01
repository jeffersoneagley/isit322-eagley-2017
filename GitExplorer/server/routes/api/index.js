let express = require('express');
let router = express.Router();
let morgan = require('morgan')('api-index');
let requester = require('request');
let MicroServiceAddressUtility = require('../../../config/microserviceAddressesUtility');

let proxy = require('http-proxy-middleware');

/* GET home page. */
router.get('/foo', function(request, response, next) {
    let message = {'result': 'success', 'foo': 'bar', 'file': 'api.js'};
    // morgan('Foo called on server with message: ' + message);
    response.send(message);
});

router.all('*', (req, res, next) => {
    console.log('api server ' + req.url);
    return next();
});
// restream parsed body before proxying
let restream = (proxyReq, req, res, options) => {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
};

router.use('/git', proxy({
    target: MicroServiceAddressUtility.getAddress('git'),
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    pathRewrite: {
        '^/api': '',           // remove base path
        '^/git': ''           // remove base path
    },
    onProxyReq: restream,
}));

router.get('/qux/:data', (req, res) => {
    console.log(req.params);
    requester(MicroServiceAddressUtility.getAddress('qux') + '/' + req.params.data).pipe(res);
});

router.get('/', (request, response, next) => {
    response.status(200).send('<p>this is an API</p>');
});

module.exports = router;
