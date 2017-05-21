/**
 * Created by fish on 4/18/17.
 */
import getData from './mock-data';

'use strict';

const whatwgFetch = jest.genMockFromModule('whatwg-fetch');

let fetch = function(url) {

    let objectState = getData(url);

    let response = {};
    response.json = function() {
        return objectState;
    };

    let quiet = true;
    let debug = (message) => {
        if (!quiet) {
            console.log(message);
        }
    };

    debug('FETCH STATER', objectState);
    return {
        then: function(func) {
            debug('FETCH TEST ONE', func(response));
            return {
                then: function(func) {
                    //func(JSON.stringify(stater));
                    func(objectState);
                    return {
                        catch: function() {

                        },
                    };
                },
            };
        },
    };
};

whatwgFetch.fetch = fetch;
window.fetch = fetch;

module.exports = whatwgFetch;
