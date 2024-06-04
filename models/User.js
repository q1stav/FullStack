const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
 email: {
    type: String,
    required: true,
    unique:true,
  
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
