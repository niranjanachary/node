"use strict";
var express = require('express'),
  session = require('express-session'),
  redis   = require("redis"),
  redisStore = require('connect-redis')(session),
  app = express(),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  upload = multer(),
  glob = require('glob'),
  path = require('path'),
  fs = require('fs');
 global.util = require('util');

//Load configurations
var variables = require('./config.js');
var config = variables[variables.environment];

// Database from here
global.mongoose = require('mongoose');
mongoose.connect(config.database.engine+"://"+config.database.host+":"+config.database.port+"/"+config.database.database, { useNewUrlParser: true,useUnifiedTopology: true  });

//Debugging
var http,name;
global.debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';
 debug('booting %o', name);

//Session server
if(config.redis.enable == 1){
  var session_client  = redis.createClient();
  app.use(session({
        secret: 'secrtkey',
        // create new redis store.
        store: new redisStore({ host: config.redis.host, port: config.redis.port, client: session_client,ttl :  config.redis.ttl}),
        saveUninitialized: false,
        resave: false
      }));
}


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

//Load all controllers
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

//Load main routes
var routes = require('./route.js');
var middleware = require('./middleware.js');
app.use('/',middleware);

//both index.js and routes.js should be in same directory
app.use('/', routes);

//Load all routes
glob.sync(path.join(__dirname, 'routes')+'/*.js').forEach(function(file) {
	var route = require(path.resolve(file));
	app.use('/', route);
});


//Start server
var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s", host, port)
})