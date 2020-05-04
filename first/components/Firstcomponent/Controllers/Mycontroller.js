var Mycontroller = {};
Mycontroller.index = function(req,res) {
    console.log(req.session);

    if(req.session.key) {
        // if email key is sent redirect.
        res.end(req.session.key);
        // res.redirect('/admin');
    } else {
        // else go to home page.
        res.render('index');
    }

    // res.render('index');
};
Mycontroller.signin = async  function(req,res) {
     
    var user = await Users.findOne({username: req.body.username});
    if(user){
        var passwordStatus = user.comparePassword(req.body.password);
        if(passwordStatus){
            res.json(user);
        } else {
            res.json({"status":false,"message":"Username or password incorrect"});
        }
    } else {
        res.json({"status":false,"message":"Username or password incorrect"});return;
    }

    // var user = Users.findOne({username: req.body.username}, function(err, user){
    //     if(err){
    //         res.json({"status":false,"message":"Username or password incorrect"});return;
    //     }
    //     if(!user){
    //         res.json({"status":false,"message":"Username or password incorrect"});return;
    //     }
    //     var passwordStatus = user.comparePassword(req.body.password);
    //     if(passwordStatus){
    //     } else {
    //         res.json({"status":false,"message":"Username or password incorrect"});
    //     }
    //  });
    };
module.exports = Mycontroller;
// global.controllers['mycontroller'] = mycontroller;