const constants = require('../system/constants');
const axios = require('axios');

const HEADERS = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

function handleAxiosError(error) {
    if (error.response) {
        const { data = {}, status } = error.response;
        throw { status: data.status || 'API_ERROR', message: data.message || `HTTP ${status} error`, httpStatus: status };
    }
    if (error.request) { throw { status: 'NETWORK_ERROR', message: 'No response from server.' }; }
    throw { status: 'REQUEST_ERROR', message: error.message || 'Unknown error' };
}

module.exports = { 
    getFiatHistoricalData,
};

async function getFiatHistoricalData(api_key, auth_token, currency) {
    try {
        HEADERS['auth_token'] = `${auth_token}`;
        HEADERS['api_key'] = `${api_key}`;
        const { data } = await axios.get(
            `${constants.server.API_URL}${constants.server.API_VERSION}/historical-data/fiat`,
            { headers: HEADERS, params: { currency } }
        );
        return data;
    } catch (error) { handleAxiosError(error); }
}