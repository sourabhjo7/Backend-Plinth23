const mongoose = require('mongoose')

// TeamCreation model

const eventSchema = new mongoose.Schema({ 
    eventname:String,
    leaderEmail:{
        type:String,
        default:null        
    }, 
    eventType:{
        type:String,
        default:"indi"        
    },
    membersEmail:[],
    teamSize:{
    type: Number ,
    default:1
}   
})

module.exports  = mongoose.model("Event", eventSchema)
