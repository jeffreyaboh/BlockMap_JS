const misc = require('./plugin/misc.js');

class BlockMapPlugin {
    constructor(options) {
        this.options = options || {};
        this.pingServer();
    }

    async pingServer() { return misc.pingServer(this.options); }
}

module.exports = {
    BlockMapPlugin,
    options: {
        name: 'BlockMap_JS',
        description: 'A plugin for BlockMap functionality in JavaScript',
        version: '1.0.0',
    },
    pingServer: misc.pingServer
};