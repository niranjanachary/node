var express = require('express');
var app = express();
util = require('util');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var config = require('./config.js');
// console.log(config);return;

debug = require('debug')('http')
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
app.set('views','./views');

app.use(express.static('public'));
app.use('/static', express.static('public'));

var routes = require('./route.js');


var middleware = require('./middleware.js');
app.use('/',middleware);

// Database from here
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/nodejs", { useNewUrlParser: true });
var usersSchema = mongoose.Schema({
   name: String,
   password: String,
   address: String
});
Users = mongoose.model("Users", usersSchema);


//both index.js and routes.js should be in same directory
app.use('/', routes);

var glob = require('glob'),
	path = require('path');

glob.sync('./routes/*.js').forEach(function(file) {
	var route = require(path.resolve(file));
	app.use('/', route);
});


   //    var newUsers = new Users({
   //       name: 'Niranjan',
   //       age: 30,
   //       nationality: 'Indian2',
   //       address: 'Motinagar',
   //       phone: '9963606921'
   //    });
		
   //    newPerson.save(function(err, Person){
   //       if(err)
   // console.log("Failed " + Date.now());
   //       else
   // console.log("Success " + Date.now());
   //    });

var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port

	console.log("Example app listening at http://%s:%s", host, port)
})