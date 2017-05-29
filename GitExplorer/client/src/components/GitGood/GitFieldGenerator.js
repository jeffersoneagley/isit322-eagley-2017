import Debug from 'debug';
let debug = new Debug('git-field-Generator');

class GitFieldGenerator {

    constructor() {
        this.getFields = this.getFields.bind(this);
    }

    handleInputDataType = (data) => {
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

    /**
     * processes the entry name into the various display data types used in other components.
     * @param entry
     * @param value
     * @return {{id: *, label, type: string, sample: string}}
     */
    makeEntryFromDataType = (entry, value) => {
        let result = {
            id: entry,
            label: entry.replace(/_/, ' '),
            type: 'paragraph',
            sample: entry + '-unknown',
        };
        if (entry.includes('avatar') && value !== undefined && value !== '') {
            result.type = 'image';
        } else if (value === 'true' || value === true ||
            value === false || value === 'false') {
            result.type = 'bool';
        } else if (entry.includes('url') && !value.includes('{')) {
            result.type = 'url';
        } else {
            switch (typeof (value)) {
                case 'datetime':
                    result.type = 'year';
                    break;
                default:
                    result.type = 'paragraph';
            }
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
        return this.processObjectToArray(data);
    };
}

export default GitFieldGenerator;