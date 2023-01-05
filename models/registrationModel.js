// Registration model
const mongoose = require('mongoose')

const registerSchema = new mongoose.Schema({
    name : {type : String, required : true, },
    email : {type : String, required : true, unique : true},
    phoneNo : {type : String, required : true, unique : true},
    country : {type : String, required : true},
    city : {type : String, required : true},
    residentialAddress : {type : String, required : true},
    instituteName : {type : String, required : true},
    instituteAddress : {type : String, required : true},
    instituteAreaPincode : {type : String, required : true},
    yearOfStudy : {type : Number, required : true},
})

module.exports  = mongoose.model("Register", registerSchema)

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

