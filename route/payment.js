const express = require("express");
const router = express.Router();


router.get("/:eventName/:user_id",async (req,res)=>{
    const {user_id,eventName}=req.params;
    return res.status(200).send("hello to payment ---->",user_id,eventName)
    
})


module.exports = router
