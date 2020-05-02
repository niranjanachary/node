'use strict';
class SecondController {
    constructor(height, width) {    
      this.height = height;
      this.width = width;
    }
    myFunction(req,res){
        res.render('index');
    }
}