# BlockMap JS Plugin

[![NPM Version](https://img.shields.io/npm/v/@ethion/blockmap-js.svg)](https://www.npmjs.com/package/@ethion/blockmap-js)
[![NPM Downloads](https://img.shields.io/npm/dm/@ethion/blockmap-js.svg)](https://www.npmjs.com/package/@ethion/blockmap-js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js](https://img.shields.io/node/v/@ethion/blockmap-js.svg)](https://nodejs.org/)
[![GitHub Issues](https://img.shields.io/github/issues/jeffreyaboh/BlockMap_JS.svg)](https://github.com/jeffreyaboh/BlockMap_JS/issues)
[![GitHub Stars](https://img.shields.io/github/stars/jeffreyaboh/BlockMap_JS.svg)](https://github.com/jeffreyaboh/BlockMap_JS)

A powerful, lightweight JavaScript plugin for seamless integration with the BlockMap.dev API service. Designed for developers who need reliable blockchain data access with robust authentication and comprehensive error handling.

> **🎯 Perfect for blockchain developers, DeFi applications, and Web3 projects requiring reliable API connectivity.**

## 🚀 Key Features

- ✅ **Zero-Config Setup** - Works out of the box with minimal configuration
- 🔑 **Secure Authentication** - Industry-standard email/API key authentication
- 🔍 **Real-time Health Monitoring** - Built-in connectivity and authentication status checks
- 🌐 **High-Performance Networking** - Optimized HTTP requests with automatic retries
- 🛡️ **Bulletproof Validation** - Comprehensive input validation and sanitization
- 📊 **Rich Error Context** - Detailed error messages with actionable insights
- 🔧 **TypeScript First** - Full type safety with comprehensive definitions
- 📱 **Universal Compatibility** - Works in Node.js, browsers, and serverless environments
- ⚡ **Lightweight** - Only 74KB unpacked, single dependency (axios)
- 🧪 **Production Ready** - Thoroughly tested and battle-hardened

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| Bundle Size | 22.7 KB |
| Unpacked Size | 74.0 KB |
| Dependencies | 1 (axios) |
| Node.js Support | >=12.0.0 |
| TypeScript | ✅ Full Support |
| License | GPL-3.0 |

## 📦 Installation

### NPM
```bash
npm install @ethion/blockmap-js
```

### Yarn
```bash
yarn add @ethion/blockmap-js
```

### Verification
```bash
npm list @ethion/blockmap-js
```



## 🚀 Quick Start

### Basic Usage
```javascript
const BlockMapJS = require('@ethion/blockmap-js');

// Initialize the plugin
const blockMap = BlockMapJS({
    EMAIL: 'your-email@example.com',
    API_KEY: 'your-api-key-here'
});

// Test connectivity
async function quickTest() {
    try {
        // 1. Check overall health
        const health = await blockMap.healthCheck();
        console.log('✅ Health Status:', health.status);
        
        // 2. Test server response
        const ping = await blockMap.pingServer();
        console.log('🌐 Server Response:', ping);
        
        // 3. Verify authentication
        const auth = await blockMap.getAuthenticationToken();
        console.log('🔑 Authentication:', auth ? 'Success' : 'Failed');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

quickTest();
```

### ES6/ES2015+ Syntax
```javascript
import BlockMapJS from '@ethion/blockmap-js';

const blockMap = BlockMapJS({
    EMAIL: process.env.BLOCKMAP_EMAIL,
    API_KEY: process.env.BLOCKMAP_API_KEY
});

// Using async/await
const health = await blockMap.healthCheck();
```

### TypeScript Usage
```typescript
import BlockMapJS from '@ethion/blockmap-js';

interface BlockMapConfig {
    EMAIL: string;
    API_KEY: string;
}

const config: BlockMapConfig = {
    EMAIL: 'your-email@example.com',
    API_KEY: 'your-api-key-here'
};

const blockMap = BlockMapJS(config);

// Type-safe operations
const health: HealthCheckResult = await blockMap.healthCheck();
```

## 📖 API Reference

### Constructor

#### `BlockMapJS(options)`

Creates a new BlockMap plugin instance with the provided configuration.

```javascript
const blockMap = BlockMapJS({
    EMAIL: 'your-email@example.com',    // Required: Your registered email
    API_KEY: 'your-api-key'             // Required: Your API access key
});
```

#### Configuration Parameters

| Parameter | Type | Required | Validation | Description |
|-----------|------|----------|------------|-------------|
| `EMAIL` | `string` | ✅ Yes | Valid email format | Email address registered with BlockMap.dev |
| `API_KEY` | `string` | ✅ Yes | Non-empty string | API key provided by BlockMap.dev service |

#### Validation Rules
- **Email**: Must match regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- **API Key**: Must be a non-empty string after trimming whitespace
- Both parameters are required and will throw validation errors if missing

---

### Instance Methods

#### `healthCheck()`

Performs a comprehensive system health check, validating credentials and testing API connectivity.

**Syntax:**
```javascript
const result = await blockMap.healthCheck();
```

**Parameters:** None

**Returns:** `Promise<HealthCheckResult>`

**Response Format:**
```javascript
{
    status: 'healthy' | 'unhealthy',
    authentication: {
        token: string,
        expires: string,
        user: object
    } | null,
    credentials: {
        email: boolean,    // true if email is properly configured
        api_key: boolean   // true if API key is properly configured
    },
    timestamp: string,     // ISO 8601 timestamp
    errors?: string[]      // Array of error messages (only present if unhealthy)
}
```

**Example Usage:**
```javascript
try {
    const health = await blockMap.healthCheck();
    
    if (health.status === 'healthy') {
        console.log('✅ All systems operational');
        console.log('Authentication expires:', health.authentication.expires);
    } else {
        console.log('❌ Health issues detected:');
        health.errors.forEach(error => console.log(`  • ${error}`));
    }
} catch (error) {
    console.error('Health check failed:', error.message);
}
```

---

#### `pingServer()`

Tests server connectivity and measures response time. Useful for monitoring API availability.

**Syntax:**
```javascript
const result = await blockMap.pingServer();
```

**Parameters:** None

**Returns:** `Promise<PingResult>`

**Response Format:**
```javascript
{
    status: string,        // Server status message
    message: string,       // Response message from server
    timestamp: string,     // Server timestamp
    responseTime?: number, // Response time in milliseconds
    version?: string,      // API version information
    server?: string        // Server identification
}
```

**Example Usage:**
```javascript
try {
    const startTime = Date.now();
    const ping = await blockMap.pingServer();
    const responseTime = Date.now() - startTime;
    
    console.log(`🌐 Server Response: ${ping.status}`);
    console.log(`⏱️ Response Time: ${responseTime}ms`);
    console.log(`📍 Server Time: ${ping.timestamp}`);
} catch (error) {
    console.error('❌ Server unreachable:', error.message);
}
```

---

#### `getAuthenticationToken()`

Retrieves a fresh authentication token for API access. Tokens are used for authenticated requests.

**Syntax:**
```javascript
const result = await blockMap.getAuthenticationToken();
```

**Parameters:** None

**Returns:** `Promise<AuthenticationResult>`

**Response Format:**
```javascript
{
    data: {
        token: string,      // JWT authentication token
        expires: string,    // Token expiration time (ISO 8601)
        type: string,       // Token type (usually "Bearer")
        scope: string[],    // Array of permissions/scopes
        user: {
            id: string,
            email: string,
            role: string
        }
    },
    meta: {
        issued: string,     // Token issue time
        duration: number    // Token validity duration in seconds
    }
}
```

**Example Usage:**
```javascript
try {
    const authResult = await blockMap.getAuthenticationToken();
    const { token, expires, user } = authResult.data;
    
    console.log('🔑 Authentication successful');
    console.log(`👤 User: ${user.email} (${user.role})`);
    console.log(`⏰ Expires: ${new Date(expires).toLocaleString()}`);
    
    // Use token for authenticated requests
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    
} catch (error) {
    console.error('❌ Authentication failed:', error.message);
}
```

## 🔐 Authentication

The plugin requires valid credentials to interact with the BlockMap.dev API:

1. **Email**: Your registered email address
2. **API Key**: Unique API key provided by BlockMap.dev

### Getting Your Credentials

1. Visit [BlockMap.dev](https://blockmap.dev)
2. Create an account or log in
3. Navigate to your API settings
4. Generate or copy your API key

## 🏗️ Usage Examples

### Basic Health Check

```javascript
const BlockMapJS = require('@ethion/blockmap-js');

const blockMap = BlockMapJS({
    EMAIL: 'developer@example.com',
    API_KEY: 'your-api-key-here'
});

async function checkHealth() {
    try {
        const health = await blockMap.healthCheck();
        
        if (health.status === 'healthy') {
            console.log('✅ Plugin is healthy and ready!');
            console.log('Authentication:', health.authentication);
        } else {
            console.log('❌ Plugin health issues detected:');
            health.errors?.forEach(error => console.log(`  • ${error}`));
        }
    } catch (error) {
        console.error('Health check failed:', error.message);
    }
}

checkHealth();
```

### Server Connectivity Test

```javascript
async function testConnectivity() {
    try {
        console.log('🌐 Testing server connectivity...');
        const ping = await blockMap.pingServer();
        console.log('✅ Server is responding:', ping);
    } catch (error) {
        console.error('❌ Server connectivity failed:', error.message);
    }
}

testConnectivity();
```

### Complete Authentication Flow

```javascript
async function authenticateAndTest() {
    try {
        // Step 1: Get authentication token
        console.log('🔑 Getting authentication token...');
        const authResult = await blockMap.getAuthenticationToken();
        console.log('✅ Authentication successful');
        
        // Step 2: Perform health check
        console.log('🏥 Performing health check...');
        const health = await blockMap.healthCheck();
        console.log(`✅ Health status: ${health.status}`);
        
        // Step 3: Test server connectivity
        console.log('🌐 Testing server ping...');
        const ping = await blockMap.pingServer();
        console.log('✅ Server is responsive');
        
        console.log('🎉 All systems operational!');
        
    } catch (error) {
        console.error('❌ Authentication flow failed:', error.message);
    }
}

authenticateAndTest();
```

### Environment Variables Setup

Create a `.env` file in your project root:

```env
BLOCKMAP_EMAIL=your-email@example.com
BLOCKMAP_API_KEY=your-api-key-here
```

Then use in your application:

```javascript
require('dotenv').config();

const blockMap = BlockMapJS({
    EMAIL: process.env.BLOCKMAP_EMAIL,
    API_KEY: process.env.BLOCKMAP_API_KEY
});
```

## ⚠️ Error Handling

The plugin provides detailed error messages and status codes for better debugging:

```javascript
try {
    await blockMap.healthCheck();
} catch (error) {
    console.error('Error Details:');
    console.error('Message:', error.message);
    console.error('Method:', error.method);  // Method that failed
    console.error('Code:', error.code);      // Error status code
}
```

### Common Error Types

| Error Type | Description | Solution |
|------------|-------------|----------|
| `VALIDATION_ERROR` | Invalid email or API key format | Check credentials format |
| `AUTHENTICATION_ERROR` | Invalid credentials | Verify email and API key |
| `NETWORK_ERROR` | No response from server | Check internet connection |
| `API_ERROR` | Server-side error | Check BlockMap.dev status |

## 🔧 Configuration

### Validation Rules

- **Email**: Must be a valid email address format
- **API Key**: Must be a non-empty string
- Both credentials are required for initialization

### Server Configuration

The plugin connects to:
- **Base URL**: `https://eagle.ethion.cloud`
- **API Version**: `/v1`
- **Content Type**: `application/json`

## 🎯 Best Practices

### 1. **Environment Configuration**
```javascript
// ✅ Good: Use environment variables
const blockMap = BlockMapJS({
    EMAIL: process.env.BLOCKMAP_EMAIL,
    API_KEY: process.env.BLOCKMAP_API_KEY
});

// ❌ Bad: Hardcode credentials
const blockMap = BlockMapJS({
    EMAIL: 'user@example.com',
    API_KEY: 'hardcoded-key'
});
```

### 2. **Error Handling Patterns**
```javascript
// ✅ Comprehensive error handling
async function robustApiCall() {
    try {
        const result = await blockMap.healthCheck();
        return result;
    } catch (error) {
        // Log error details for debugging
        console.error('API Error Details:', {
            message: error.message,
            method: 'healthCheck',
            timestamp: new Date().toISOString()
        });
        
        // Handle specific error types
        if (error.message.includes('NETWORK_ERROR')) {
            // Implement retry logic
            return await retryWithBackoff(() => blockMap.healthCheck());
        }
        
        throw error; // Re-throw if unhandlable
    }
}
```

### 3. **Connection Pooling & Reuse**
```javascript
// ✅ Create once, reuse multiple times
const blockMap = BlockMapJS(config);

// Use the same instance for multiple operations
async function multipleOperations() {
    const [health, ping, auth] = await Promise.all([
        blockMap.healthCheck(),
        blockMap.pingServer(),
        blockMap.getAuthenticationToken()
    ]);
    return { health, ping, auth };
}
```

### 4. **Monitoring & Logging**
```javascript
// ✅ Implement structured logging
const logger = {
    info: (msg, data) => console.log(`[INFO] ${msg}`, data),
    error: (msg, data) => console.error(`[ERROR] ${msg}`, data),
    warn: (msg, data) => console.warn(`[WARN] ${msg}`, data)
};

async function monitoredHealthCheck() {
    const startTime = Date.now();
    
    try {
        logger.info('Starting health check');
        const result = await blockMap.healthCheck();
        
        logger.info('Health check completed', {
            duration: Date.now() - startTime,
            status: result.status
        });
        
        return result;
    } catch (error) {
        logger.error('Health check failed', {
            duration: Date.now() - startTime,
            error: error.message
        });
        throw error;
    }
}
```

## 🔧 Advanced Usage

### Retry Logic with Exponential Backoff
```javascript
async function retryWithBackoff(operation, maxRetries = 3, baseDelay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            
            if (attempt === maxRetries) break;
            
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    
    throw lastError;
}

// Usage
const result = await retryWithBackoff(() => blockMap.pingServer());
```

### Rate Limiting Implementation
```javascript
class RateLimitedBlockMap {
    constructor(options, rateLimit = 10) { // 10 requests per second
        this.blockMap = BlockMapJS(options);
        this.queue = [];
        this.processing = false;
        this.rateLimit = rateLimit;
        this.interval = 1000 / rateLimit;
    }
    
    async request(method, ...args) {
        return new Promise((resolve, reject) => {
            this.queue.push({ method, args, resolve, reject });
            this.processQueue();
        });
    }
    
    async processQueue() {
        if (this.processing || this.queue.length === 0) return;
        
        this.processing = true;
        
        while (this.queue.length > 0) {
            const { method, args, resolve, reject } = this.queue.shift();
            
            try {
                const result = await this.blockMap[method](...args);
                resolve(result);
            } catch (error) {
                reject(error);
            }
            
            if (this.queue.length > 0) {
                await new Promise(resolve => setTimeout(resolve, this.interval));
            }
        }
        
        this.processing = false;
    }
    
    // Proxy methods
    healthCheck() { return this.request('healthCheck'); }
    pingServer() { return this.request('pingServer'); }
    getAuthenticationToken() { return this.request('getAuthenticationToken'); }
}
```

### Circuit Breaker Pattern
```javascript
class CircuitBreakerBlockMap {
    constructor(options, threshold = 5, timeout = 60000) {
        this.blockMap = BlockMapJS(options);
        this.failureCount = 0;
        this.threshold = threshold;
        this.timeout = timeout;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = 0;
    }
    
    async execute(method, ...args) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
            }
            this.state = 'HALF_OPEN';
        }
        
        try {
            const result = await this.blockMap[method](...args);
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
}
```

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. **Authentication Errors**

**Problem:** `Authentication failed: Invalid credentials`
```bash
❌ getAuthenticationToken failed: Invalid credentials (Code: AUTH_ERROR)
```

**Solutions:**
- ✅ Verify email and API key are correct
- ✅ Check for typos and extra whitespace
- ✅ Ensure API key hasn't expired
- ✅ Confirm account is active on BlockMap.dev

```javascript
// Debug authentication
const blockMap = BlockMapJS({
    EMAIL: process.env.BLOCKMAP_EMAIL?.trim(),
    API_KEY: process.env.BLOCKMAP_API_KEY?.trim()
});

// Test credentials
try {
    await blockMap.getAuthenticationToken();
    console.log('✅ Credentials are valid');
} catch (error) {
    console.log('❌ Credential validation failed:', error.message);
}
```

#### 2. **Network Connectivity Issues**

**Problem:** `No response from server`
```bash
❌ pingServer failed: No response from server (Code: NETWORK_ERROR)
```

**Solutions:**
- ✅ Check internet connection
- ✅ Verify firewall settings
- ✅ Test with different network
- ✅ Check if BlockMap.dev is accessible

```javascript
// Network diagnostics
async function diagnoseNetwork() {
    const tests = [
        { name: 'DNS Resolution', url: 'https://eagle.ethion.cloud' },
        { name: 'Basic Connectivity', test: () => blockMap.pingServer() },
        { name: 'Authentication', test: () => blockMap.getAuthenticationToken() }
    ];
    
    for (const test of tests) {
        try {
            if (test.test) {
                await test.test();
            } else {
                await fetch(test.url, { method: 'HEAD' });
            }
            console.log(`✅ ${test.name}: OK`);
        } catch (error) {
            console.log(`❌ ${test.name}: ${error.message}`);
        }
    }
}
```

#### 3. **Rate Limiting**

**Problem:** `Too many requests`
```bash
❌ API Error: Rate limit exceeded (Code: RATE_LIMIT_ERROR)
```

**Solutions:**
- ✅ Implement request throttling
- ✅ Add delays between requests
- ✅ Use the rate-limited wrapper above

#### 4. **Token Expiration**

**Problem:** `Token has expired`
```bash
❌ Authentication token expired (Code: TOKEN_EXPIRED)
```

**Solutions:**
- ✅ Implement automatic token refresh
- ✅ Check token expiration before use
- ✅ Cache tokens efficiently

```javascript
class TokenManager {
    constructor(blockMap) {
        this.blockMap = blockMap;
        this.token = null;
        this.expires = null;
    }
    
    async getValidToken() {
        if (!this.token || Date.now() >= this.expires) {
            await this.refreshToken();
        }
        return this.token;
    }
    
    async refreshToken() {
        const auth = await this.blockMap.getAuthenticationToken();
        this.token = auth.data.token;
        this.expires = new Date(auth.data.expires).getTime();
    }
}
```

### Performance Optimization

#### Memory Usage
```javascript
// ✅ Proper cleanup
const blockMap = BlockMapJS(config);

// Use the instance for multiple operations
// No need to create multiple instances

// For long-running applications, monitor memory usage
process.on('SIGINT', () => {
    console.log('Cleaning up resources...');
    // Perform any necessary cleanup
    process.exit(0);
});
```

#### Response Caching
```javascript
class CachedBlockMap {
    constructor(options, ttl = 300000) { // 5 minutes TTL
        this.blockMap = BlockMapJS(options);
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    async cachedRequest(method, cacheKey, ...args) {
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.ttl) {
            return cached.data;
        }
        
        const result = await this.blockMap[method](...args);
        this.cache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
        });
        
        return result;
    }
    
    async pingServer() {
        return this.cachedRequest('pingServer', 'ping');
    }
}
```

## 🧪 Testing & Quality Assurance

### Running the Demo
```bash
# Clone and test the demo application
git clone https://github.com/jeffreyaboh/BlockMap_JS.git
cd BlockMap_JS/demo
npm install
npm start
```

### Unit Testing Example
```javascript
// test/blockmap.test.js
const BlockMapJS = require('@ethion/blockmap-js');

describe('BlockMap JS Plugin', () => {
    let blockMap;
    
    beforeEach(() => {
        blockMap = BlockMapJS({
            EMAIL: 'test@example.com',
            API_KEY: 'test-api-key'
        });
    });
    
    test('should initialize with valid credentials', () => {
        expect(blockMap).toBeDefined();
        expect(blockMap.email).toBe('test@example.com');
        expect(blockMap.apiKey).toBe('test-api-key');
    });
    
    test('should validate credentials on initialization', () => {
        expect(() => {
            BlockMapJS({ EMAIL: '', API_KEY: 'valid-key' });
        }).toThrow('EMAIL is required');
        
        expect(() => {
            BlockMapJS({ EMAIL: 'valid@email.com', API_KEY: '' });
        }).toThrow('API_KEY is required');
    });
    
    test('should handle health check', async () => {
        // Mock successful response
        const mockResponse = {
            status: 'healthy',
            credentials: { email: true, api_key: true },
            timestamp: new Date().toISOString()
        };
        
        // You would mock the actual API call here
        const health = await blockMap.healthCheck();
        expect(health).toHaveProperty('status');
        expect(health).toHaveProperty('timestamp');
    });
});
```

### Integration Testing
```javascript
// test/integration.test.js
describe('BlockMap Integration Tests', () => {
    test('should complete full authentication flow', async () => {
        const blockMap = BlockMapJS({
            EMAIL: process.env.TEST_EMAIL,
            API_KEY: process.env.TEST_API_KEY
        });
        
        // Test all major functions
        const health = await blockMap.healthCheck();
        expect(health.status).toBe('healthy');
        
        const ping = await blockMap.pingServer();
        expect(ping).toHaveProperty('status');
        
        const auth = await blockMap.getAuthenticationToken();
        expect(auth.data).toHaveProperty('token');
    }, 10000); // 10 second timeout for network requests
});
```

## 🔗 Framework Integrations

### Express.js Middleware
```javascript
const express = require('express');
const BlockMapJS = require('@ethion/blockmap-js');

const app = express();

// Initialize BlockMap
const blockMap = BlockMapJS({
    EMAIL: process.env.BLOCKMAP_EMAIL,
    API_KEY: process.env.BLOCKMAP_API_KEY
});

// Middleware for BlockMap authentication
const blockMapAuth = async (req, res, next) => {
    try {
        const health = await blockMap.healthCheck();
        if (health.status !== 'healthy') {
            return res.status(503).json({ error: 'BlockMap service unavailable' });
        }
        
        req.blockMap = blockMap;
        next();
    } catch (error) {
        res.status(500).json({ error: 'BlockMap authentication failed' });
    }
};

// Use middleware
app.use('/api/blockmap', blockMapAuth);

// API endpoint
app.get('/api/blockmap/health', async (req, res) => {
    try {
        const health = await req.blockMap.healthCheck();
        res.json(health);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### Next.js API Routes
```javascript
// pages/api/blockmap/health.js
import BlockMapJS from '@ethion/blockmap-js';

const blockMap = BlockMapJS({
    EMAIL: process.env.BLOCKMAP_EMAIL,
    API_KEY: process.env.BLOCKMAP_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const health = await blockMap.healthCheck();
        res.status(200).json(health);
    } catch (error) {
        console.error('BlockMap health check failed:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
```

### React Hook
```javascript
// hooks/useBlockMap.js
import { useState, useEffect } from 'react';

export function useBlockMap() {
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function checkHealth() {
            try {
                setLoading(true);
                const response = await fetch('/api/blockmap/health');
                const data = await response.json();
                setHealth(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        
        checkHealth();
        const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
        
        return () => clearInterval(interval);
    }, []);
    
    return { health, loading, error };
}

// components/BlockMapStatus.jsx
import { useBlockMap } from '../hooks/useBlockMap';

export function BlockMapStatus() {
    const { health, loading, error } = useBlockMap();
    
    if (loading) return <div>Checking BlockMap status...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className={`status ${health?.status === 'healthy' ? 'healthy' : 'unhealthy'}`}>
            BlockMap Status: {health?.status}
            {health?.timestamp && (
                <small>Last checked: {new Date(health.timestamp).toLocaleTimeString()}</small>
            )}
        </div>
    );
}
```

### Serverless Functions (Vercel/Netlify)
```javascript
// api/blockmap-proxy.js (Vercel)
import BlockMapJS from '@ethion/blockmap-js';

const blockMap = BlockMapJS({
    EMAIL: process.env.BLOCKMAP_EMAIL,
    API_KEY: process.env.BLOCKMAP_API_KEY
});

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        switch (req.query.action) {
            case 'health':
                const health = await blockMap.healthCheck();
                return res.json(health);
                
            case 'ping':
                const ping = await blockMap.pingServer();
                return res.json(ping);
                
            case 'auth':
                const auth = await blockMap.getAuthenticationToken();
                return res.json(auth);
                
            default:
                return res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        console.error('BlockMap API error:', error);
        return res.status(500).json({ error: error.message });
    }
}
```

## 📋 Requirements

- **Node.js**: 12.0.0 or higher
- **Dependencies**: axios ^1.10.0

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/jeffreyaboh/BlockMap_JS/issues)
- **Documentation**: [GitHub Repository](https://github.com/jeffreyaboh/BlockMap_JS)
- **Email**: support@trovilo.co

## 🏢 About Ethion Technologies

BlockMap JS Plugin is developed and maintained by Ethion Technologies. Visit [blockmap.dev](https://blockmap.dev) for more information about our services.

---

**Made with ❤️ by Ethion Technologies**
