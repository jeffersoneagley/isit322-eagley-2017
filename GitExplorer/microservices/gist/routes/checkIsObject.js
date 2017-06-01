/**
 * Created by fish on 5/20/17.
 */

module.exports = function(input) {
    return typeof(input) === 'string' ? JSON.parse(input) : input;
};
