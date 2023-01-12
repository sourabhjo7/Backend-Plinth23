const mongoose = require('mongoose')

// TeamCreation model

const paymentSchema = new mongoose.Schema({ 
    fullName : String,
    email:String,
    phoneNo:String,
    paidForEvent:{
        type:String,
        default:null
    },
    upiId:String,
    paid:Number,
    confirmation:{
        type:Boolean,
        default:false
    },
    ssLink:{
        type:"String",
        default:"no link"
    }
})

module.exports  = mongoose.model("Payment", paymentSchema)