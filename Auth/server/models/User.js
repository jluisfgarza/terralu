const mongoose = require('mongoose');
const bycript = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: String,
    default: ''
  }
});
UserSchema.methods.generateHash = function(password){
    return bycript.hashSync(password, bycript.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
    return bycript.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);
