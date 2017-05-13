// let debug = require('debug')('git-convert');

class GitFieldGenerator {

    constructor() {
        this.getFields = this.getFields.bind(this);
        // this.getFields = function (input) {
        //     let data = this.handleInputDataType(input);
        //     let arr = this.processObjectToArray(data);
        //     return arr;
        // };
    }

    handleInputDataType = (data) => {
        switch (typeof (data)) {
            case "string":
                return JSON.parse(data);
            case "object":
                return data;
            default:
                console.error('Invalid data of type ' + typeof (data))
        }
    };

    makeEntryFromDataType = (entry, value) => {
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
    };

    processObjectToArray = (input) => {
        let arr = [];
        for (let entry in input) {
            if (input.hasOwnProperty(entry) &&
                input[entry] !== null) {
                let currentEntry = input[entry];
                // debug(entry);
                arr.push(this.makeEntryFromDataType(entry, currentEntry));
            }
        }
        return arr;
    };

    /**
     * Feed this a git url so that it can generate field defintions on the fly
     * @param input {object} git data
     * @return {array} returns an array of field definitions
     */
    getFields = (input) => {
        let data = this.handleInputDataType(input);
        let arr = this.processObjectToArray(data);
        return arr;
    };
}

export default GitFieldGenerator;