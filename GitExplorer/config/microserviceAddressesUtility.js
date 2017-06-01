/**
 * Created by fish on 5/31/17.
 */

let serverConfig = require('./microserviceAddresses.json');

let MicroServiceAddressesUtility = {

    getAddress: function(serverName) {
        return serverConfig[serverName].url ||
            'http://localhost:' + serverConfig[serverName].port;
    },
};

module.exports = MicroServiceAddressesUtility;
