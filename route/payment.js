const express = require("express");
const router = express.Router();


router.get("/payment/:eventName/:user_id",async (req,res)=>{
    const {user_id,eventName}=req.params;
    console.log("hello to payment ---->",user_id,eventName)
})


module.exports = router
