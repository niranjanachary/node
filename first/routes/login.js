"use strict";
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('Hello World login');
})


router.get('/login', function(req, res){
   res.send('GET login route on things.');
});
router.post('/login', function(req, res){
   res.send('POST route on things.');
});
router.get('/register', function(req, res){
   res.render('register');
});
router.post('/register', function(req, res){

      var newUsers = new Users({
         name: req.body.name,
         password: req.body.password,
         address: req.body.address,
      });
		
      newUsers.save(function(err, Person){
        if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New user added", type: "success", user: req.body});
      });
});
router.get('/users', function(req, res){
   Users.find(function(err, response){
      res.json(response);
   });
});

//export this router to use in our index.js
module.exports = router;