/**
 * Created by fish on 5/16/17.
 */

let express = require('express');
let router = express.Router();
let getGitHub = require('../../getGitHubAuth');
let checkIsObject = require('../../checkIsObject');

router.get('/', function(req, res, next) {
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

module.exports = router;
