var http = require('http');
var url = require("url");
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!123');
});

server.on('close', function() { // We listened to the close event
    console.log('Goodbye!');
});
server.listen(8080); // Starts the server

// server.close(); // Stops the server. Triggers the close event