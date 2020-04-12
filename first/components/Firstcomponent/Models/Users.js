var usersSchema = mongoose.Schema({
    name: String,
    password: String,
    address: String
});
global.Users = mongoose.model("Users", usersSchema);
 