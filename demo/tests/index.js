const BlockMap_JS = require('../../index.js')({
    API_KEY: '67ac9fd907bf8f141d7b2b71',
    EMAIL: 'developer@ethion.cloud'
});

module.exports = { }

const pingServer = async () => {
    try {
        const result = await BlockMap_JS.healthCheck();
        console.log(result);
    } catch (error) { console.error(error); }
}

pingServer();