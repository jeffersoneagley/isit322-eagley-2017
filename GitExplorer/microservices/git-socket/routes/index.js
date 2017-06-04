let express = require('express');
// let router = express.Router();
const ws = require('express-ws')(express.Router());
let MicroServiceAddress = require('../../../config/microserviceAddresses.json');
const router = ws.app;

router.all('*', (req, res, next) => {
    console.log('socket server ' + req.url);
    return next();
});

router.all('/event', (req, res) => {
    onEventRecieved();
    res.status(200).send('event recieved');
});

router.ws('/connect', (ws, res) => {
    console.log('connecting to router');
    ws.on('connect', (client) => {
        console.log('connected client');
        ws.send('welcome');
    });
    ws.on('message', (msg) => {
        console.log('message from client ' + msg);
        ws.send(msg + ' to you too.');
    });
});

function onEventRecieved() {

    let aWss = ws.getWss('/connect');
    aWss.clients.forEach(function(client) {
        client.send('hello');
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Socket demo server!'});
});

// router.listen(MicroServiceAddress['git-socket'].port);

module.exports = router;
