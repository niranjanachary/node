'use strict';
var UserSchema = new mongoose.Schema({
    fullname : {
      type : String,
      trim : true,
      required : false
    },
    username : {
      type : String,
      unique : true,
      lowercase : true,
      trim : true,
      required : true
    },
    password : {
      type : String,
      required : true
    },
    created : {
      type : Date,
      default : Date.now
    }
  });
  UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.getTableName = function() {
  return 'Users';
};
UserSchema.methods.getTableClass = function() {
  return 'Users';
};
module.exports = UserSchema;
 