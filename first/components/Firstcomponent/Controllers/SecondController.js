'use strict';
class SecondController {
    constructor(height, width) {    
      this.height = height;
      this.width = width;
    }
    async myFunction(req,res){
      var firstclass = new FirstClass('Niranjan');
      var data = [];
      data.users = await firstclass.print();
      res.render('auth/users',data);
    }
}
module.exports = SecondController;