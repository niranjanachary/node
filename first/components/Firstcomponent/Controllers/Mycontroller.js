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
Mycontroller.dashboard = async  function(req,res) {
    if(req.session.user){
        res.json({'status':true,'message':'Show dasboard','user':req.session.user});
    } else {
        res.json({'status':false,'message':'Redirect to login page'});
    }
}
Mycontroller.signin = async  function(req,res) {
     
    var user = await Users.findOne({username: req.body.username});

    if(user){
        var passwordStatus = user.comparePassword(req.body.password);
        if(passwordStatus){
            req.session.user = user;
            res.json(user);
        } else {
            res.json({"status":false,"message":"Username or password incorrect"});
        }
    } else {
        res.json({"status":false,"message":"Username or password incorrect"});return;
    }
};
module.exports = Mycontroller;
// global.controllers['mycontroller'] = mycontroller;