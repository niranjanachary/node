var mysql = {};
mysql['Schema'] = class Schema{
    constructor(columns){
        this.columns = columns ;
        this.methods = {};
     }
};
mysql['model'] = function(tableName, schema){
    tableName = class tableName {
        constructor(columns){
            this.columns = columns ;
            this.methods = {};
         }
         async find() {
            var sql = "SELECT * FROM users";
            var args = {};
           return new Promise( ( resolve, reject ) => {
               connection.query( sql, args, ( err, rows ) => {
                   if ( err )
                       return reject( err );
                   resolve( rows );
               } );
           } );
       }
       async findOne(condition) {
            var sql = "SELECT * FROM users";
            sql = sql+' where username="'+condition.username+'"';
            var args = {};
            return new Promise( ( resolve, reject ) => {
                connection.query( sql, args, ( err, rows ) => {
                    if ( err )
                        return reject( err );
                    resolve( rows );
                });
            });
        }
    }
    var obj =  new tableName();
    for(var index in schema.methods){
        obj[index] = schema.methods[index];
    }
    return obj;
}
module.exports = mysql;