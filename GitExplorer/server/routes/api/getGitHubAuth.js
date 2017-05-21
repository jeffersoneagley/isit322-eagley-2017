/**
 * Created by fish on 5/20/17.
 */
let GitHub = require('github-api');

let ghtoken = process.env.GITHUB_TOKEN;
let ghpassword = process.env.GITHUB_PASSWORD;
let ghusername = process.env.GITHUB_USERNAME;

if (ghusername === '' || ghusername === undefined) {
    ghusername = 'jefferson.eagley@gmail.com';
}

let isUsingToken = false;

if (ghtoken !== undefined &&
    ghtoken !== '') {
    console.log('github found token');
    isUsingToken = true;
} else if (ghpassword !== undefined &&
    ghpassword !== '') {
    console.log('github found password');
    isUsingToken = false;
} else {
    throw('github not configured. Please export GITHUB_TOKEN or GITHUB_PASSWORD');
}

// basic auth
getGitHub = function() {
    let auth = {
        username: ghusername,
    };
    if (isUsingToken) {
        auth.token = ghtoken;
    } else {
        auth.password = ghpassword;
    }
    let ghres = new GitHub(auth);
    // console.log(ghres.getUser());
    return ghres;
};
module.exports = getGitHub;
