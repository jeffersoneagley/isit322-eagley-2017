let express = require('express');
let router = express.Router();
let url = require('url');
let request = require('request');
//central server configurations
let MicroServiceAddressUtility = require('../../../config/microserviceAddressesUtility.js');
//local functionality
let markdownGenerator = require('./markdownGenerator')();

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

router.get('/gist/:gistid', (req, res) => {
        if (req.params.gistid) {
            let gistid = req.params.gistid;

            //get gist
            request.get(
                url.resolve(
                    MicroServiceAddressUtility.getAddress('api'),
                    '/api/git/gist/byId/' + gistid,
                ),
                (err, gistResponse) => {
                    let gistBody = gistResponse.body;
                    console.log(err);
                    console.log(gistBody);
                    if (err) {

                        res.status(400).send({
                            title: 'Invalid gist',
                            message: 'Please include a valid gist ID in your request',
                        });
                    }
                    //pass data to md generator
                    // console.log('gistResponse found ' + gistBody);
                    let doc = markdownGenerator.fromGist(gistBody);

                    res.set('content-type', 'text/x-markdown').status(200).send(doc);

                },
            );
        } else {
            res.status(400).send({
                title: '/gistid missing error',
                message: 'Please include a gist ID in your request',
            });
        }
    },
);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Markdown!',
        description: 'This is an API for converting a git ' +
        ' gist into a markdown document',
    });
});

module.exports = router;
