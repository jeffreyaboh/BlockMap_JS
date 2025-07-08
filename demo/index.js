var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.createServer(app);
var httpPort = process.env["PORT_HTTP_PROD"] || 80;
var tests = require('../demo/tests/index.js');

// Starting Server (HTTP)
httpServer.listen(httpPort, function() {
    console.log('BlockMap Demo App Server listening on port ' + httpPort);
});

// Default launch URL
app.get('/', function(req, res) { res.send('Welcome to the demo app!'); });
  