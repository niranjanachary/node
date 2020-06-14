var Mycontroller = {};
Mycontroller.index = async function(req,res) {
    var firstclass = new FirstClass('Niranjan');
    var data = [];
    // data.users = await firstclass.getUser('EAAJICyPMbMcBAKMk1tc26mAVqpldHCi8XDWFPVhA8ZCt5QsLDM4vCZC1RtMks9nWP4525dZBm4ZBZBz5VsARemGjL9G523unXGwTaXEwzZBCVY2vo3Fht6lh0Up9xJ1WodLJKJyqX25oMvhqiwQ37MGEtW1JdFp8i7EgvyOzHEQAZDZD');
    i18n.setLocale('en');
    var loc = __('Hello');
    var data = {};
    data.loc = loc;
    res.render('layout/home',data);
};
Mycontroller.dashboard = async  function(req,res) {
    if(req.session.user){
        res.json({'status':true,'message':'Show dasboard','user':req.session.user});
    } else {
        res.json({'status':false,'message':'Redirect to login page'});
    }
}

module.exports = Mycontroller;
// global.controllers['mycontroller'] = mycontroller;