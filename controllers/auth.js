const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const Payment = require("../models/payment");

const Team = require("../models/teamModel");

exports.allusers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }); // to avoid one admin account 
    console.log("users--->", users);
    return res.status(200).json({ success: true, count: users.length, users });
  } catch (e) {

    return res.status(401).json({ success: false, msg: e });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    await User.findByIdAndRemove(id);

    res.status(201).json({ success: true });
  } catch (e) {
    console.error();
  }
};

exports.register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNo,
      country,
      city,
      residentialAddress,
      instituteName,
      instituteAddress,
      instituteAreaPincode,
      yearOfStudy,
      password,

    } = req.body.data;
    const accomodation = req.body.accomodation;

    // if (
    //   !(
    //     fullName &&
    //     email &&
    //     password &&
    //     phoneNo &&
    //     country &&
    //     city &&
    //     residentialAddress &&
    //     instituteName &&
    //     instituteAddress &&
    //     instituteAreaPincode &&
    //     yearOfStudy
    //   )
    // ) {
    //   console.log("data toh aya ",req.body);
    //   return res.status(404).send("All fields are required");
    // }



    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("existing user ", existingUser);
      return res.status(400).json({
        message: "already exits",
      });
    }

    const encPassword = await bcrypt.hash(password, 10);

    let urole = "user";
    if (req.body.userRole) {
      urole = req.body.userRole;
    }
    const user = await User.create({
      fullName,
      phoneNo,
      country,
      city,
      residentialAddress,
      instituteName,
      instituteAddress,
      instituteAreaPincode,
      yearOfStudy,
      email: email.toLowerCase(),
      password: encPassword,
      accomodation,
      role: urole,
    });

    //token
    const token = jwt.sign(
      { user_id: user._id, email, role: user.role, name: user.fullName, accomodation: accomodation },
      process.env.SECRET_KEY,
      {
        expiresIn: "10h",
      }
    );
    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    return res.status(200).cookie("token", token, options).json({
      success: true,
      msg: "Sucessfully Registered ",
      token,
      user,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "Something Went Wrong . Please try again "
    })
      ;
    console.log(e);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //token
      const token = jwt.sign(
        { user_id: user._id, email, role: user.role, name: user.fullName, accomodation: user.accomodation },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.password = undefined;

      // Setting Up cookies
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        msg: "Sucessfully Logged In ",
        success: true,
        token,
        user,
      });
    } else {
      return res.status(400).json({
        msg: "Invalid Credentials , Create a new account or check details ",
        success: false
      })

      console.log("check password or create new account");
    }

    res.status(400).send("Email or password incorrect");
  } catch (e) {
    return res.status(500).json({
      msg: "Something Went Wrong . Please try again "
    })
    console.log(e);
  }
};

exports.logout = (req, res) => {
  console.log("logout route called ");
  console.log(req.cookies);
  return res.clearCookie("token").status(200).json({
    success: true,
    msg: "Successfully Logged Out "
  });
};
exports.updateUser = async (req, res) => {
  const { firstName, lastName, email, password, userRole } = req.body;
  console.log({
    firstName,
    lastName,
    password,
    userRole,
  });
  const { id } = req.params;
  if (password == "") {
    User.findByIdAndUpdate(
      { _id: id },
      { firstName, lastName, email, userRole },
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
          return res.status(201).json({ success: true });
        }
      }
    );
  } else {
    const encPassword = await bcrypt.hash(password, 10);
    User.findByIdAndUpdate(
      { _id: id },
      { firstName, lastName, email, password: encPassword, userRole },
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
          return res.status(201).json({ success: true });
        }
      }
    );
  }
};

exports.allusersById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);


    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(200).json({ success: false, msg: "error " });
  }
};

exports.allpendingPayments = async (req, res) => {
  try {
    // const { id } = req.params;
    // console.log(id);
    const pendingPayments = await Payment.find({ confirmation: false });


    res.status(200).json({ success: true, pendingPayments });
  } catch (e) {
    res.status(200).json({ success: false, msg: "error " });
  }
};



exports.createTeam = async (req, res) => {
  try {
    const {
      leaderEmail,
      teamName,
      membersEmail,
      teamSize,
    } = req.body.data

    const existingUser = await User.findOne(Team.leaderEmail);
    const existingTeam = await Team.findOne({ teamCode });
    if (existingUser) {
      if (existingTeam) {
        console.log("existing team ", existingTeam);
        return res.status(400).json({
          success:false,
          msg: "team already exits",
        });
      }

      const team = await Team.create({
        leaderEmail,// emailId used to search user 
        teamName,
        membersEmail,
        teamSize,
        teamCode: Date.now().toString(36).slice(-5),
      });
      return res.status(200).json({
        success:true,
        msg:"team formed ",
        team
      });
    }
    return res.status(400).json({
      success:false,
      msg:"user doesn't exist "
    })

  }

  catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Something Went Wrong . Please try again "
    });

  }
}