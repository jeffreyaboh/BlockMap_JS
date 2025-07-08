const BlockMap_JS = require('../../index.js');

module.exports = { }


const pingServer = async () => {
    try {
        const result = await BlockMap_JS.pingServer();
        console.log('Server ping successful:', result);
    } catch (error) {
        console.error('Error pinging server:', error);
    }
}

pingServer();