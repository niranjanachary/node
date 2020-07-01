'use strict';
class Corecontroller {
    constructor(height, width) {    
      this.height = height;
      this.width = width;
    }
    async index(req,res){
        var data = {'ejs_page':'layout/home'};
        res.render('layout/index',data);
    }
    async signin(req,res){
        var user = await Users.findOne({username: req.body.username});
        if(user){
            var passwordStatus = user.comparePassword(req.body.password);
            if(passwordStatus){
                // user.session_name = JSON.stringify(req);
                req.session.user = user;
                var response = {};
                response.sessid = req.sessionID;
                response.session_name = req.sessionID;
                response.token = req.sessionID;
                response.user = user;
                res.json(response);
            } else {
                res.status(403).json({"status":false,"message":"Username or password incorrect"});
            }
        } else {
            res.status(403).json({"status":false,"message":"Username or password incorrect"});
        }
    }
    async signout(req,res){
        // req.session.user = null;
        req.session.destroy();
        res.json({"status":true});
    }
    async token(req,res){
        req.session.destroy();
        res.json({"token":req.sessionID});
    }
    async social(req,res){
        var provider  = req.params.provider
        var func = passport.authenticate(provider);
        func(req,res);
    }
}
module.exports = Corecontroller;