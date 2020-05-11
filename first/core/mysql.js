var mysql = {};
mysql['Schema'] = class Schema{
    constructor(columns){
        this.columns = columns ;
        this.methods = {};
     }
};
mysql['model'] = function(tableName, schema){
    var className = {};
   className[tableName] = class {
        constructor(columns){
            for(var index in columns){
                this[index] = columns[index];
            }
            // this.methods = {};
         }
         static async find(func) {
            var sql = "SELECT * FROM "+tableName;
            var args = {};
           return new Promise( ( resolve, reject ) => {
               connection.query( sql, args, ( err, rows ) => {
                   if ( err )
                       return reject( err );
                    var result = [];
                    for(var row of rows){
                        var object = Object.assign({}, this);
                        console.log(row);
                        for(var index in row){
                            object[index] = row[index];
                        }
                        result.push(object);
                    }
                    if(func)
                        func(err,result);
                    resolve( result );
               } );
           } );
       }
       static async findOne(condition) {
            var sql = "SELECT * FROM "+tableName;
            sql = sql+' where username="'+condition.username+'"';
            var args = {};
            return new Promise( ( resolve, reject ) => {
                connection.query( sql, args, ( err, rows ) => {
                    if ( err )
                        return reject( err );
                        var result = {};
                        for(var row of rows){
                            var object = Object.assign({}, this);
                            console.log(row);
                            for(var index in row){
                                object[index] = row[index];
                            }
                            result = object;
                        }
                        resolve( result );
                });
            });
        }
        async save(func){
            var sql = "INSERT into "+tableName;
            var insertcols = '(';
            for(var index in this){
                insertcols = insertcols + index;
                if((index) != 'address')
                    insertcols = insertcols + ',';
            }
            insertcols = insertcols + ')';
            var insertval = '(';
            for(var index in this){
                var insertvalstring = '"' + this[index] + '"';
                insertval = insertval + insertvalstring;
                
                if((index) != 'address')
                    insertval = insertval + ',';
            }
            insertval = insertval + ')';
            sql = sql + insertcols + 'values' + insertval;
            return new Promise( ( resolve, reject ) => {
                connection.query( sql, ( err, result ) => {
                    if ( err )
                        return reject( err );
                    if(func)
                        func(err, result );
                    resolve( result );
                });
            });
        }
    }
    for(var index in schema.methods){
        className[tableName][index] = schema.methods[index];
    }
    return className[tableName];
    var obj =  new className[tableName]();
    for(var index in schema.columns){
        obj[index] = null;
    }
    return obj;
}
module.exports = mysql;