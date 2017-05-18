/**
 * Created by fish on 5/18/17.
 */
var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var noop = function() {
};

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({
    print: noop,
}); // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
    spec: {
        displayPending: true,
    },
})); // add jasmine-spec-reporter
jrunner.loadConfigFile(); // load jasmine.json configuration
jrunner.execute();