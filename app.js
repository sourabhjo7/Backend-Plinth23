const dotenv = require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose= require('mongoose');
// const passport = require('passport');
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const Register = require('./models/userModel')
// const userModel = require('./models/userModel')
// const Team = require('./models/teamModel')
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

// Routers
const indexRouter = require("./route/index");
const authRouter = require("./route/auth");

const User = require("./models/userModel");
const Payment = require("./models/payment");

const https = require("https");
const http = require("http");
const fs = require("fs");
const { async } = require("q");
const payment = require("./models/payment");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(
  cors({
    origin: [
      "https://plinth.co.in",
      "https://63b9f54534bf097ab0b08ac4--roaring-kitsune-c3e064.netlify.app",
      "http://localhost:3000",
    ], // origin: ["http://localhost:3000"], // change origin based on domain main of the application
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Using Routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

app.post("/:eventName/:user_id", async (req, res) => {
  try {
    const { user_id, eventName } = req.params;
    const { paid, upiId } = req.body;
    const file = req.files.file;
    let currImg;
    if(file){
        await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            console.log("====>",result);
          currImg = result.url;
        });
  }
    
   
    console.log(user_id, eventName, paid, upiId, currImg);
    console.log("---->", currImg);
    const user = await User.findById(user_id);

    let pendingPay = await Payment.create({
      fullName: user.fullName,
      email: user.email,
      phoneNo: user.phoneNo,
      paidForEvent: eventName,
      upiId: upiId,
      paid: paid,
      ssLink: currImg, // link dalna h abhi
    });

    console.log("payment schema ==", pendingPay);

    return res
      .status(200)
      .json({
        success: true,
        msg: "you will recieve the confirmation mail of payment within 24 hours",
        pendingPay,
      });
  } catch (e) {
    console.log("error", e);
    return res
      .status(402)
      .json({
        success: false,
        msg: "something happened pls click confirm again",
      });
  }
});


// app.get('', (req, res) => {
//     if(Payment.confirmation === false)
//     {
//         Payment.confirmation = true;
//         res.status(200).send('Payment confirmed');
//     }
// })

/*


app.get('/create-team', (req, res) => {
    res.send('Create a team')
})



app.post('/create-team', urlencodedParser,async (req,res) => {
    try{
        const TEAMNAME = req.body.teamName;
        const EMAIL1 = req.body.email1;
        const EMAIL2 = req.body.email2;
        const EMAIL3 = req.body.email3;
        const EMAIL4 = req.body.email4;
        const EMAIL5 = req.body.email5;
        const EMAIL6 = req.body.email6;
        const EMAIL7 = req.body.email7;
        const EMAIL8 = req.body.email8;
        const EMAIL9 = req.body.email9;
        const EMAIL10 = req.body.email10;
    
        const team1 = new Team ({
            teamName : TEAMNAME,
            email1 : EMAIL1,
            email2 : EMAIL2,
            email3 : EMAIL3,
            email4 : EMAIL4,
            email5 : EMAIL5,
            email6 : EMAIL6,
            email7 : EMAIL7,
            email8 : EMAIL8,
            email9 : EMAIL9,
            email10 : EMAIL10,
        })
    
        const teamNameExists = await Team.findOne({teamName:TEAMNAME})
        if(!teamNameExists)
        {
            const email1Existsss = await Register.findOne({email:EMAIL1});
            const email2Existsss = await Register.findOne({email:EMAIL2});
            const email3Existsss = await Register.findOne({email:EMAIL3});
            const email4Existsss = await Register.findOne({email:EMAIL4});
            const email5Existsss = await Register.findOne({email:EMAIL5});
            const email6Existsss = await Register.findOne({email:EMAIL6});
            const email7Existsss = await Register.findOne({email:EMAIL7});
            const email8Existsss = await Register.findOne({email:EMAIL8});
            const email9Existsss = await Register.findOne({email:EMAIL9});
            const email10Existsss = await Register.findOne({email:EMAIL10});
            const email1Exists =await Team.findOne({email1:EMAIL1});
            const email2Exists =await Team.findOne({email2:EMAIL2});
            const email3Exists =await Team.findOne({email3:EMAIL3});
            const email4Exists =await Team.findOne({email4:EMAIL4});
            const email5Exists =await Team.findOne({email5:EMAIL5});
            const email6Exists =await Team.findOne({email6:EMAIL6});
            const email7Exists =await Team.findOne({email7:EMAIL7});
            const email8Exists =await Team.findOne({email8:EMAIL8});
            const email9Exists =await Team.findOne({email9:EMAIL9});
            const email10Exists =await Team.findOne({email10:EMAIL10});
            if(email1Existsss&&email2Existsss&&email3Existsss&&email4Existsss&&email5Existsss&&email6Existsss&&email7Existsss&&email8Existsss&&email9Existsss&&email10Existsss)
            {
                if(!email1Exists && !email2Exists && !email3Exists && !email4Exists && !email5Exists && !email6Exists && !email7Exists && !email8Exists)
                {
                    console.log("Emails verified");
                    team1.save();
                }
                else if(!email1Exists && !email2Exists && !email3Exists && !email4Exists && !email5Exists && !email6Exists && !email7Exists)
                {
                    console.log("Team consists 7 members. All emails verified")
                    team1.save();
                }
                else if(!email1Exists && !email2Exists && !email3Exists && !email4Exists && !email5Exists && !email6Exists)
                {
                    console.log("Team consists 6 members. All emails verified")
                    team1.save();
                }
    
                else if(!email1Exists && !email2Exists && !email3Exists && !email4Exists && !email5Exists)
                {
                    console.log("Team consists 5 members. All emails verified")
                    team1.save();
                }
    
                else if(!email1Exists && !email2Exists && !email3Exists && !email4Exists)
                {
                    console.log("Team consists 4 members. All emails verified")
                    team1.save();
                }
    
                else if(!email1Exists && !email2Exists && !email3Exists)
                {
                    console.log("Team consists 3 members. All emails verified")
                    team1.save();
                }
    
                else if(!email1Exists && !email2Exists)
                {
                    console.log("Team consists 2 members. All emails verified")
                    team1.save();
                }
    
                else if(!email1Exists)
                {
                    console.log("Only you are registered.Email verified")
                    team1.save();
                }
                
                else
                {
                    console.log('One or more emails from your team are not registered')
                }
            }
        }
        else{
            res.send('team name already exists')
        }
    }
    
    catch(e){
        console.log(e);
        res.send('ERROR')
    }
    
    })






   */

const credentials = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
  ca: fs.readFileSync("./chain.pem"),
};

https.createServer(credentials, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

// app.listen(5000);
