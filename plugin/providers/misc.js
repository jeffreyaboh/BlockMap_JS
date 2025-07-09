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
    pingServer
};

async function pingServer(event = 'ping') {
    try {
        const { data } = await axios.get(
            `${constants.server.API_URL}${constants.server.API_VERSION}`,
            { headers: HEADERS, params: { event } }
        );
        return data;
    } catch (error) { handleAxiosError(error); }
}

