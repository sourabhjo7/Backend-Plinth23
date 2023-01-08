const jwt = require('jsonwebtoken');

const User = require("../models/userModel");

//Checking if the token if valid or not
const valToken = async (req, res, next) => {
  try {
    // looking for token in the header
    let authHeaderVal = req.cookies.token || req.headers.authorization;

    if (!authHeaderVal) {
      return res.status(403).json("token not found");
    }

    const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header

    const data = jwt.verify(token, process.env.SECRET_KEY); //verifing token with the secret key
    req.userData = data;
    next();

  } catch (e) {
    return res.status(401).json({
      msg: "Auth failed not verified user",
      err: e
    });
  }

}

const valAdmin = async (req, res, next) => {
  try {
    // looking for token in the header
    let authHeaderVal = req.cookies.token || req.headers.authorization;

    if (!authHeaderVal) {
      return res.status(403).json("token not found");
    }

    const token = authHeaderVal.replace("Bearer ", ""); //replacing Bearer from token if getting from header

    const data = jwt.verify(token, process.env.SECRET_KEY); //verifing token with the secret key
    req.userData = data;
    console.log("--> token data ",data);
    if(data.role==="admin"){
      return next();
    }
    else{
      return res.status(401).json({
        success:false,
        msg:"only admin is allowed to access this page "
      })
    }
    

  } catch (e) {
    return res.status(401).json({
      msg: "Auth failed not verified user",
      err: e
    });
  }

}
module.exports = {
  valToken,
  valAdmin
}
