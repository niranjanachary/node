"use strict";
var express = require('express');
var app = express();
global.util = require('util');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var glob = require('glob'),
   path = require('path');
var fs = require('fs');
var recursive = require("recursive-readdir");


var variables = require('./config.js');
var config = variables[variables.environment];

var http,name;

global.debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

 debug('booting %o', name);

//To parse json data
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array());

var cookieParser = require('cookie-parser');
app.use(cookieParser())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/static', express.static('public'));

// Database from here
global.mongoose = require('mongoose');
mongoose.connect(config.database.engine+"://"+config.database.host+":"+config.database.port+"/"+config.database.database, { useNewUrlParser: true,useUnifiedTopology: true  });

global.controllers = {};
function walkDir(dir, callback) {
   fs.readdirSync(dir).forEach( f => {
     let dirPath = path.join(dir, f);
     let isDirectory = fs.statSync(dirPath).isDirectory();
     isDirectory ? 
       walkDir(dirPath, callback) : callback(path.join(dir, f));
   });
 };
 walkDir(path.join(__dirname, 'components'), function(filePath) {
   require(filePath);
 });
   
var routes = require('./route.js');
var middleware = require('./middleware.js');
app.use('/',middleware);

//both index.js and routes.js should be in same directory
app.use('/', routes);

glob.sync(path.join(__dirname, 'routes')+'/*.js').forEach(function(file) {
	var route = require(path.resolve(file));
	app.use('/', route);
});



var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s", host, port)
})