const misc = require('./plugin/misc.js');

class BlockMapPlugin {
    constructor({ EMAIL, API_KEY } = {}) {
        this.email = EMAIL;
        this.apiKey = API_KEY;
        this.validateCredentials();
    }

    handleApiError(error, method) {
        const msg = error?.message || error?.data?.message || 'Unknown error occurred';
        const code = error?.status || error?.data?.status || 'UNKNOWN_ERROR';
        return new Error(`❌ ${method} failed: ${msg} (Code: ${code})`);
    }

    validateCredentials() {
        const errors = [];
        if (!this.apiKey || typeof this.apiKey !== 'string' || !this.apiKey.trim())
            errors.push('API_KEY is required and must be a non-empty string');
        if (!this.email || typeof this.email !== 'string' || !this.email.trim())
            errors.push('EMAIL is required and must be a non-empty string');
        if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
            errors.push('EMAIL must be a valid email address');
        if (errors.length)
            throw new Error(`❌ Configuration validation failed:\n• ${errors.join('\n• ')}`);
    }
    
    healthCheck() {
        const errors = [];
        if (!this.email) errors.push('Missing EMAIL');
        if (!this.apiKey) errors.push('Missing API_KEY');
        return {
            status: errors.length ? 'unhealthy' : 'healthy',
            credentials: { email: !!this.email, api_key: !!this.apiKey },
            ...(errors.length && { errors }),
            timestamp: new Date().toISOString()
        };
    }

    async pingServer() {
        try {
            return await misc.pingServer(this.apiKey);
        } catch (error) { throw this.handleApiError(error, 'pingServer'); }
    }

    async getAuthenticationToken() {
        try {
            return await misc.getAuthenticationToken(this.email, this.apiKey);
        } catch (error) { throw this.handleApiError(error, 'getAuthenticationToken'); }
    }
}

module.exports = (options) => {
    const plugin = new BlockMapPlugin(options);
    return {
        ...plugin,
        pingServer: () => plugin.pingServer(),
        healthCheck: () => plugin.healthCheck(),
        getAuthenticationToken: () => plugin.getAuthenticationToken(),
    };
};
