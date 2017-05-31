/**
 * Created by fish on 5/31/17.
 */

let serverConfig = require('./microserviceAddresses.json');

export default class {
    getAddress = (serverName) => {
        return serverConfig[serverName].url ||
            'http://localhost:' + serverConfig[serverName].port;
    };
}

