const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const dbUsers = mongoose.Schema({
    username : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
});

const Users = mongoose.model("Users", dbUsers, "terralu");

module.exports = {
    Users : Users
};