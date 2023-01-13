const express = require("express");
const router = express.Router();
const {valToken, valAdmin} = require("../midllewares/auth");
const controller = require('../controllers/auth');//Requring Controllers
// ex---> auth/register
router.post("/register", controller.register);
router.post("/createTeam/", controller.createTeam);
router.get("/getallusers",valAdmin,controller.allusers);

router.get("/getallusers/:id",valAdmin,controller.allusersById); //hatana hai last me

router.get("/getallpendingPayments",valAdmin,controller.allpendingPayments);

// ex---> auth/login
router.post("/login", controller.login);
router.get("/logout", controller.logout);
module.exports = router
