// Imports..
var express = require("express");
const {
  loginValidations,
  registerValidations,
  userRegisterController,
  userLoginController,
} = require("../controller");
var router = express.Router();

//  Routes..
router.post("/register", registerValidations, userRegisterController);
router.post("/login", loginValidations, userLoginController);

// Exports..
module.exports = router;
