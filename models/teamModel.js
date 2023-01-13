const mongoose = require('mongoose')

// TeamCreation model

const teamSchema = new mongoose.Schema({
    leaderEmail: String,// emailId used to search user 
    teamName : String,
    membersEmail:[],
    teamSize:Number,
    teamCode:String,     //auto-generated code : Math.random().toString(36).slice(-5); 
})

module.exports  = mongoose.model("Team", teamSchema)
