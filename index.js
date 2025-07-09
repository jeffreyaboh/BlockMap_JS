const authentication = require('./plugin/providers/authentication.js');
const historical_data = require('./plugin/providers/historical_data.js');
const misc = require('./plugin/providers/misc.js');

module.exports = (options) => {
    const plugin = new BlockMapPlugin(options);
    return {
        ...plugin,
        pingServer: () => plugin.pingServer(),
        healthCheck: () => plugin.healthCheck(),
        getAuthenticationToken: () => plugin.getAuthenticationToken(),
        getAllCountries: () => plugin.getAllCountries(),
        getFiatHistoricalData: (options) => plugin.getFiatHistoricalData(options)
    };
};

class BlockMapPlugin {
    constructor({ EMAIL, API_KEY } = {}) {
        this.email = EMAIL;
        this.apiKey = API_KEY;
        this.authToken = null;
        this.validateCredentials();
    }

    handleApiError(error, method) {
        const msg = error?.message || error?.data?.message || 'Unknown error occurred';
        const code = error?.status || error?.data?.status || 'UNKNOWN_ERROR';
        return new Error(`❌ ${method} failed: ${msg} (Code: ${code})`);
    }

    async validateCredentials() {
        const errors = [];
        if (!this.apiKey || typeof this.apiKey !== 'string' || !this.apiKey.trim())
            errors.push('API_KEY is required and must be a non-empty string');
        if (!this.email || typeof this.email !== 'string' || !this.email.trim())
            errors.push('EMAIL is required and must be a non-empty string');
        if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
            errors.push('EMAIL must be a valid email address');
        if (errors.length)
            throw new Error(`❌ Configuration validation failed:\n• ${errors.join('\n• ')}`);
        return this.initialize();
    }

    async initialize() {
        const health = await this.healthCheck();
        this.authToken = health?.auth_token || null;
    }

    async healthCheck() {
        const errors = [];
        if (!this.email) errors.push('Missing EMAIL');
        if (!this.apiKey) errors.push('Missing API_KEY');
        try {
            const auth = await authentication.getAuthenticationToken(this.email, this.apiKey);
            this.authToken = auth?.data?.auth_token || null;
            return {
                status: errors.length ? 'unhealthy' : 'healthy',
                auth_token: auth?.data?.auth_token || null,
                credentials: { email: !!this.email, api_key: !!this.apiKey },
                ...(errors.length && { errors }),
                timestamp: new Date().toISOString()
            };
        } catch (error) { throw this.handleApiError(error, 'healthCheck'); }
    }

    async pingServer() {
        try {
            await this.initialize();
            return await misc.pingServer(this.apiKey);
        } catch (error) { throw this.handleApiError(error, 'pingServer'); }
    }

    async getAuthenticationToken() {
        try {
            return await authentication.getAuthenticationToken(this.email, this.apiKey);
        } catch (error) { throw this.handleApiError(error, 'getAuthenticationToken'); }
    }

    async getAllCountries() {
        try {
            await this.initialize();
            return await misc.getAllCountries();
        } catch (error) { throw this.handleApiError(error, 'getAllCountries'); }
    }

    async getFiatHistoricalData(options = {}) {
        try {
            const { currency } = options;
            if (!currency) throw new Error('Currency is required for getFiatHistoricalData');
            await this.initialize();
            return await historical_data.getFiatHistoricalData(this.apiKey, this.authToken, currency);
        } catch (error) { throw this.handleApiError(error, 'getFiatHistoricalData'); }
    }
}