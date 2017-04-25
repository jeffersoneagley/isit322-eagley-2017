/**
 * Created by fish on 4/18/17.
 */
import getData from "./mock-data";

'use strict';

const whatwgFetch = jest.genMockFromModule('whatwg-fetch');

var fetch = function (url) {

    var objectState = getData(url);

    var response = {};
    response.json = function () {
        return objectState;
    };

    console.log("FETCH STATER", objectState);
    return {
        then: function (func) {
            console.log('FETCH TEST ONE', func(response));
            return {
                then: function (func) {
                    //func(JSON.stringify(stater));
                    func(objectState);
                    return {
                        catch: function () {

                        }
                    }
                }
            }
        }
    }
};

whatwgFetch.fetch = fetch;
window.fetch = fetch;

module.exports = whatwgFetch;