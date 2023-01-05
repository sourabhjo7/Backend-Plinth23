// Registration model
const mongoose = require('mongoose')
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
  phoneNo: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  residentialAddress: {
    type: String,
    required: true,
  },
  instituteName: {
    type: String,
    required: true,
  },
  instituteAddress: {
    type: String,
    required: true,
  },
  instituteAreaPincode: {
    type: String,
    required: true,
  },
  yearOfStudy: {
    type: String,
    required: true,
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

