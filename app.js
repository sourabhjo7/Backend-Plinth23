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
const Team = require("./models/teamModel");

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
