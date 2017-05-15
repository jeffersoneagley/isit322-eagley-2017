import Debug from 'debug';
let debug = new Debug('git-field-Generator');

class GitFieldGenerator {

    constructor() {
        this.getFields = this.getFields.bind(this);
    }

    handleInputDataType(data) {
        switch (typeof (data)) {
            case 'string':
                return JSON.parse(data);
            case 'object':
                return data;
            default:
                debug.log(
                    'Invalid data of type ' + typeof (data) + ' on data ' + data);
        }
    };

    makeEntryFromDataType(entry, value) {
        let result = {
            id: entry,
            label: entry + '-name',
            type: 'paragraph',
            sample: entry + '-unknown',
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

    processObjectToArray(input) {
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
    getFields(input) {
        let data = this.handleInputDataType(input);
        return this.processObjectToArray(data);
    };
}

export default GitFieldGenerator;
