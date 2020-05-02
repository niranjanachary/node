var express = require('express');
var router = express.Router();

router.get('/', controllers.Mycontroller.index);

// router.get('/second', SecondController.myFunction);

router.post('/', function(req, res){
   res.send('POST route on things.');
});
router.get('/:id([0-9]{5})', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});
//export this router to use in our index.js
module.exports = router;