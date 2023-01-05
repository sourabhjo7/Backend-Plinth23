// Registration model
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  firstName: {type: String},
  lastName: {type: String},
  password: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  residentialAddress: {
    type: String,
  },
  instituteName: {
    type: String,
  },
  instituteAddress: {
    type: String,
  },
  instituteAreaPincode: {
    type: String,
  },
  yearOfStudy: {
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

module.exports =  mongoose.model("User", userSchema);

