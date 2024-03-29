// Registration model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  fullName: {type: String},
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
  accomodation:{
    type:"string",
    default:"no"
  },
  totalpaid:{
    type:Number,
    default:0
  },
  isverified:{
    type:Boolean,
    default:false
  }
});

module.exports =  mongoose.model("User", userSchema);

