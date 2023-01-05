// const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {type: String, required : true},
  lastName: {type: String, required : true},
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  role:{
    type:String,
    default:"user"
  },
  events:[],

});

module.exports =  mongoose.model("user", userSchema, "user");

