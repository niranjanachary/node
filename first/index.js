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
  fs = require('fs'),
  cookieParser = require('cookie-parser'),
  variables = require('./config.js');
  global.util = require('util');
  global.bcrypt = require('bcrypt');


//Load configurations
var config = variables[variables.environment];

// Database from here
switch(config.database.engine){
  case 'mongodb':
    global.dbconnection = require('mongoose');
    var dbconnect = config.database.engine+"://"+config.database.username+":"+config.database.password+"@"+config.database.host+":"+config.database.port+"/"+config.database.database;
    dbconnection.connect(dbconnect, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true });
  break;
  case 'mysql':
    const mysql = require('mysql');
    global.connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.username,
      password: config.database.password,
      database: config.database.database
    });
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
    });
    global.dbconnection = require('./core/mysql.js');
    // var UserSchema = new dbconnection.Schema({
    //   fullname : {
    //     type : String,
    //     trim : true,
    //     required : false
    //   }});
    //   UserSchema.methods.getTableName = function() {
    //     return 'Users';
    //   };
    // var Model = dbconnection.model('Users',UserSchema);
    // console.log(Model.find());
  break;
}

//Debugging
var http,name;
global.debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';
 debug('booting %o', name);

//Session server
if(config.redis.enable == 1){
  var session_client  = redis.createClient(config.redis.port, config.redis.host, { auth_pass: config.redis.pass });
  app.use(session({
        secret: config.secret,
        // create new redis store.
        store: new redisStore({ host: config.redis.host, port: config.redis.port, client: session_client,ttl :  config.redis.ttl, pass:  config.redis.pass,db:  config.redis.db}),
        saveUninitialized: false,
        resave: false
      }));
} else {
  app.set('trust proxy', config.session.proxy) // trust first proxy
  app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: config.session.secure,maxAge: config.session.age }
  }));
}



//To parse json data
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array());

//Cookie
app.use(cookieParser())

//Template engine
if(config.template == 'pug'){
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));
}

if(config.template == 'html'){
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
}


//Public folder
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
    // global.controllers['mycontroller'] = require(filePath);
  var split = filePath.split('\\');
  var variable = (split[split.length-1]).replace('.js','');
  if(filePath.search('\\Controllers') >= 0){
    global.controllers[variable] = require(filePath);
  } else if (filePath.search('\\Models') >= 0){
    var ModelSchema = require(filePath);
    if(ModelSchema.methods.getTableName){
      var tableName = ModelSchema.methods.getTableName();
    } else {
      var tableName = variable;
    }
    if(ModelSchema.methods.getTableClass){
      var tableClass = ModelSchema.methods.getTableClass();
    } else {
      var tableClass = variable;
    }
    global[tableClass] = dbconnection.model(tableName, ModelSchema);
  } else{
    if(!global[variable]){
      global[variable] = require(filePath);
    } else {
      var component = filePath.split('\\components');
      component = component[1].split('\\');
      if(global[component[1]]){
        global[component[1]][variable] = require(filePath);
      } else {
        global[component[1]] = [];
        global[component[1]][variable] = require(filePath);
      }
    }
  }
 });
//both index.js and routes.js should be in same directory
//Load main routes Must be here
var routes = require('./route.js'),
    middleware = require('./middleware.js');
app.use('/',middleware);
app.use('/', routes);

//Load all routes
glob.sync(path.join(__dirname, 'routes')+'/*.js').forEach(function(file) {
	var route = require(path.resolve(file));
	app.use('/', route);
});
app.post('/log',function(req,res){
  // when user login set the key to redis.
  req.session.key=req.body.email;
  console.log(req.session.key);
  res.end(req.body.email);return;
  res.redirect('/');
});


//Start server
var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("App listening at http://%s:%s", host, port)
})