var debug = require('debug')('git-convert');
debug('this is a test');

var fs = require("fs");

function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf-8', function (err, data) {
            return err ? reject(err) : resolve(data);
        });
    });
}

function handleInputDataType(data) {
    debug('processing data inputted to json');
    debug(typeof (data))
    switch (typeof (data)) {
        case "string":
            return JSON.parse(data);
        case "object":
            return data;
        default:
            console.error('Invalid data of type ' + typeof (data))
    }
}

function processObjectToArray(input) {
    // debug(input)
    var arr = [];
    for (var entry in input) {
        if (input.hasOwnProperty(entry) &&
            input[entry] !== null) {
            // debug(entry)
            var currentEntry = Object.keys(input[entry]);
            arr.push({
                id    : currentEntry,
                label : currentEntry + '-name',
                type  : 'paragraph',
                sample: currentEntry + '-unknown'
            });
        }
    }
    return arr;
}

function handleInput(input) {
    var data = handleInputDataType(input);
    debug(data);
    var arr = processObjectToArray(data);
    debug(arr);
    console.log(arr)
}

readFile('git-user.json').then(handleInput, console.error);