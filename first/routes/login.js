"use strict";
var express = require('express');
var router = express.Router();

router.get('/', controllers.Mycontroller.index);


router.get('/login', function(req, res){
   res.send('GET login route on things.');
});
router.post('/login', function(req, res){
   res.send('POST route on things.');
});
router.post('/user/login', controllers.Corecontroller.signin);
router.post('/user/logout', controllers.Corecontroller.signout);
router.post('/user/token', controllers.Corecontroller.token);
router.get('/user/register', function(req, res){
   var data = {};
   res.render('auth/register',data);
});
router.post('/register', function(req, res){

      var newUsers = new Users({
         username: req.body.username,
         password: req.body.password,
         address: req.body.address,
      });
      newUsers.password = bcrypt.hashSync(req.body.password, 10);
      newUsers.save(function(err, Person){
        if(err){
           res.json({"status":false,"message":err})
            // res.render('show_message', {message: err, type: "error"});
        }else{
         res.json({"status":true,"message":"New user added."})
         // res.render('show_message', {
         //       message: "New user added", type: "success", user: req.body});
         }
      });
});
router.get('/hybridauth/:provider', controllers.Corecontroller.social);
router.get('/hybridauth/return/:provider', passport.authenticate(social_provider, { failureRedirect: '/' }),
(req, res, next) => {
  res.redirect('/');
});

router.post('/dashboard/index', controllers.Mycontroller.dashboard);
router.get('/admin/users', async function(req, res){
   var firstclass = new FirstClass('Niranjan');
   var data = [];
   data.users = await firstclass.print();
   // res.json(response);
   res.render('auth/users',data);
});

//export this router to use in our index.js
module.exports = router;