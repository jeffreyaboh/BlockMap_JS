const blockMap = require('../../index.js')({
    API_KEY: '67ac9fd907bf8f141d7b2b71',
    EMAIL: 'developer@ethion.cloud'
});
// const BlockMapJS = require('@ethion/blockmap-js');
// const blockMap = BlockMapJS({
//     API_KEY: '67ac9fd907bf8f141d7b2b71',
//     EMAIL: 'developer@ethion.cloud'
// });

module.exports = { }

const pingServer = async () => {
    try {
        const result = await blockMap.healthCheck();
        console.log(result);
    } catch (error) { console.error(error); }
}

pingServer();