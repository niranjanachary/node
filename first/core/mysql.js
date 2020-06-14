var mysql = {};
mysql['Schema'] = class Schema{
    constructor(columns){
        this.columns = columns ;
        this.methods = {};
     }
};
mysql['model'] = function(tableName, schema){
    var varname = 'varnamed';var functions ='';
    functions = functions + ` 
    constructor(columns){
        for(var index in columns){
            this[index] = columns[index];
        }
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
                    var object = new this();
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
                    var result = null;
                    const nameIt = (name, cls) => ({[name] : class extends cls {}})[name];
                    for(var row of rows){
                        var object = new this();
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
`;

    for(var index in schema.methods){
        var functionname = schema.methods[index]+' ';
        functionname = functionname.replace('function',' '+index+'');
        functions = functions+ ' '+ functionname;
    }
    eval(`
        var className = class ${tableName} { ${functions} } 
    `);

    return className;

}
module.exports = mysql;