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

const run = async () => {
    try {
        const result = await blockMap.getFiatHistoricalData({
            currency: 'NGN'
        });
        console.log(result);
    } catch (error) { console.error(error); }
}

run();