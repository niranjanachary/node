var express = require('express');
var app = express();

//Middleware function to log request protocol
app.use('/register1', function(req, res, next) {
	console.log(util.inspect(req.method));
	res.send('Hello browser, here is my data: '+ util.inspect(req));
	// console.log("A request for middleware register received at " + Date.now());
	next();
});
module.exports = app;