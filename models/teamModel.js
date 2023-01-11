const mongoose = require('mongoose')

// TeamCreation model

const teamSchema = new mongoose.Schema({
    leaderEmail: String,// emailId used to search user 
    teamName : String,
    membersEmail:[],
    teamSize:Number,
    teamCode:String,
})

module.exports  = mongoose.model("Team", teamSchema)
