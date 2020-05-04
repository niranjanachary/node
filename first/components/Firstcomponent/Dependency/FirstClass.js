module.exports = class FirstClass{
    constructor(name){
        this.name = name ;
     }
    
    async print(){
        var response =  await Users.find();
        return response;
        // console.log(response);
    }
};