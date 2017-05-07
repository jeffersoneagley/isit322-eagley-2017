var fs = require("fs");

/*
 * Project abandoned due to being redundant of repeating test used elsewhere
 */

function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(/*YOUR CODE HERE*/);
    });
}

readFile('old-git-user.json').then(function (text) {
    debug(text);
    var json = JSON.parse(text.result);
    debug('\n\nSTRINGIFY\n\n', JSON.stringify(json));
    var index = 0;

    var outputText = "describe('Test suite for git-user functionality', function () {";
    for (var property in json) {
        if (json.hasOwnProperty(property)) {
            outputText += "  it ('Renders paragraph containing avatar_url', () => { \n";
            outputText += "\n";
            outputText += "\n";
            outputText += "\n";
            outputText += "});\n\n";
            outputText += "  it ('Renders default click message for " + property + ", () => { \n";
            outputText += "getDefaultClick();\n";
            outputText += "\n";
            outputText += "\n";
            outputText += "});\n\n";
        }
    }
    outputText += "});";
    console.log(outputText);
});