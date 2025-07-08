# BlockMap JS Plugin

[![NPM Version](https://img.shields.io/npm/v/blockmap_js.svg)](https://www.npmjs.com/package/blockmap_js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js](https://img.shields.io/node/v/blockmap_js.svg)](https://nodejs.org/)

A powerful JavaScript plugin for integrating with the BlockMap.dev API service, providing seamless authentication and server interaction capabilities.

## 🚀 Features

- ✅ **Easy Authentication** - Streamlined API authentication with email and API key
- 🔍 **Health Check** - Monitor API connectivity and authentication status
- 🌐 **Server Ping** - Test server availability and response times
- 🛡️ **Input Validation** - Built-in credential validation and error handling
- 📊 **Detailed Error Messages** - Comprehensive error reporting with status codes
- 🔧 **TypeScript Ready** - Full TypeScript support with type definitions

## 📦 Installation

```bash
npm install blockmap_js
```

```bash
yarn add blockmap_js
```

## 🔧 Quick Start

```javascript
const BlockMapJS = require('blockmap_js');

// Initialize the plugin
const blockMap = BlockMapJS({
    EMAIL: 'your-email@example.com',
    API_KEY: 'your-api-key-here'
});

// Check plugin health
blockMap.healthCheck()
    .then(result => console.log('Health Check:', result))
    .catch(error => console.error('Error:', error.message));
```

## 📖 API Reference

### Initialization

```javascript
const blockMap = BlockMapJS({
    EMAIL: 'your-email@example.com',    // Required: Your registered email
    API_KEY: 'your-api-key'             // Required: Your API access key
});
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `EMAIL` | `string` | ✅ Yes | Valid email address registered with BlockMap.dev |
| `API_KEY` | `string` | ✅ Yes | API key provided by BlockMap.dev service |

### Methods

#### `healthCheck()`

Performs a comprehensive health check of the plugin and API connectivity.

```javascript
const health = await blockMap.healthCheck();
console.log(health);
```

**Returns:**
```javascript
{
    status: 'healthy' | 'unhealthy',
    authentication: {
        // Authentication token data
    },
    credentials: {
        email: boolean,
        api_key: boolean
    },
    timestamp: '2025-07-08T10:30:00.000Z',
    errors?: string[]  // Only present if unhealthy
}
```

#### `pingServer()`

Tests server connectivity and response time.

```javascript
const ping = await blockMap.pingServer();
console.log(ping);
```

**Returns:**
```javascript
{
    // Server response data
    status: string,
    message: string,
    timestamp: string
}
```

#### `getAuthenticationToken()`

Retrieves a fresh authentication token for API access.

```javascript
const token = await blockMap.getAuthenticationToken();
console.log(token);
```

**Returns:**
```javascript
{
    data: {
        token: string,
        expires: string,
        // Additional authentication data
    }
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
const BlockMapJS = require('blockmap_js');

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

## 🧪 Testing

Run the demo application to test the plugin:

```bash
cd demo
npm install
npm start
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
