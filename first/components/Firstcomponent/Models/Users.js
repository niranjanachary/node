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
    return bcrypt.compareSync(password, this.hash_password);
};
module.exports = UserSchema;
 