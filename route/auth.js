const express = require("express");
const router = express.Router();
const {valToken} = require("../midllewares/auth");
const controller = require('../controllers/auth');//Requring Controllers
// ex---> auth/register
router.post("/register", controller.register);
// router.get("/getallusers",controller.allusers);
// router.get("/getallusers/:id",controller.allusersById); //hatana hai last me
// ex---> auth/login
router.post("/login", controller.login);
router.get("/logout", controller.logout);
module.exports = router
