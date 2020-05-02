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
module.exports = Mycontroller;
// global.controllers['mycontroller'] = mycontroller;