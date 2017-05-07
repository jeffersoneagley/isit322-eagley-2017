let debug = require('debug')('git-convert');
debug('this is a test');

let fs = require("fs");

function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf-8', function (err, data) {
            return err ? reject(err) : resolve(data);
        });
    });
}

function handleInputDataType(data) {
    switch (typeof (data)) {
        case "string":
            return JSON.parse(data);
        case "object":
            return data;
        default:
            console.error('Invalid data of type ' + typeof (data))
    }
}

function makeEntryFromDataType(entry, value) {
    let result = {
        id    : entry,
        label : entry + '-name',
        type  : 'paragraph',
        sample: entry + '-unknown'
    };
    switch (typeof (value)) {
        case 'datetime':
            result.type = 'year';
            break;
        default:
            result.type = 'paragraph';
    }

    return result;
}

function processObjectToArray(input) {
    let arr = [];
    for (let entry in input) {
        if (input.hasOwnProperty(entry) &&
            input[entry] !== null) {
            let currentEntry = input[entry];
            // debug(entry);
            arr.push(makeEntryFromDataType(entry, currentEntry));
        }
    }
    return arr;
}

function handleInput(input) {
    let data = handleInputDataType(input);
    let arr = processObjectToArray(data);
    console.log('/*\n * Autogenerated by git-create-field-defs.js on: \n * ' +
        new Date().toUTCString() +
        '\n*/\n');
    console.log('export default ', arr)
}

readFile('git-user.json').then(handleInput, console.error);