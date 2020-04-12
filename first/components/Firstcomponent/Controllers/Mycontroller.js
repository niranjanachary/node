var mycontroller = {};
mycontroller.index = function(req,res) {
    res.render('index');
};
global.controllers['mycontroller'] = mycontroller;