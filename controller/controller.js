var { validationResult, body } = require("express-validator");
var jwt = require("jsonwebtoken");
var userModel = require("../model/model");
var bcrypt = require("bcrypt");
// Validations..
let registerValidations = [
  body("name").not().isEmpty().withMessage("name is required.."),
  body("email").not().isEmpty().withMessage("email is required..").isEmail().withMessage("Enter valid Email.."),
  body("username").not().isEmpty().withMessage("username is required.."),
  body("password").not().isEmpty().withMessage("password is required..").isLength({ min: 8 }).withMessage("Password should greater than 8 chars.."),
];
let loginValidations = [body("password").not().isEmpty().withMessage("password is required..")];
// Encryption..
let encryptPassword = async (password) => {
  return await bcrypt.hash(password, await bcrypt.genSalt(10));
};
let createToken = async (user) => {
  let token = jwt.sign({ user: user }, process.env.SECKEY, { expiresIn: "7d" });
  return token;
};
// Controllers..
let userRegisterController = async (req, res) => {
  try {
    let inputStatus = validationResult(req);
    if (!inputStatus.isEmpty()) {
      res.json({ error: inputStatus.array() });
    } else {
      let { name, email, address, username, password, cpassword } = req.body;

      let userStatus = await userModel.findOne({ email });
      if (userStatus != null) {
        return res.json({
          message: "User Already exists with this email..",
          status: "OK",
        });
      }

      if (password == cpassword) {
        password = await encryptPassword(password);
        let user = userModel.create({ name, email, address, username, password });
        let token = await createToken(user);
        res.json({
          status: res.status,
          data: {
            message: "User registered.. successfully..",
            username,
            password: password,
            token,
          },
        });
      } else {
        res.json({
          msg: "Password and confirm password should match..",
          location: "body",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
let userLoginController = async (req, res) => {
  let inputStatus = validationResult(req);
  if (!inputStatus.isEmpty()) {
    res.json({ error: inputStatus.array() });
  } else {
    let { username, email, password } = req.body;
    try {
      username = username || email;
      let loginStatus;
      if (username) {
        loginStatus = await userModel.findOne({ username });
        if (loginStatus != null) {
          if (await bcrypt.compare(password, loginStatus.password)) {
            return res.json({
              message: "Logged in successfully with username",
              data: loginStatus,
            });
          } else {
            return res.json({
              message: "Wrong Password..",
            });
          }
        } else {
          loginStatus = await userModel.findOne({ email: username });
          if (loginStatus != null) {
            if (await bcrypt.compare(password, loginStatus.password)) {
              return res.json({
                message: "Logged in successfully with email",
                data: loginStatus,
              });
            } else {
              return res.json({
                message: "Wrong Password..",
              });
            }
          } else {
            return res.json({
              message: "User Not Found..",
            });
          }
        }
      } else {
        return res.json({
          message: "Please Enter Username or Email....",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = {
  registerValidations,
  loginValidations,
  //
  userRegisterController,
  userLoginController,
};
