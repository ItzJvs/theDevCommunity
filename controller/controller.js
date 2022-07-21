var { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var { devUser } = require("../model/model");
var bcrypt = require("bcrypt");
// Encryption..
let encryptPassword = async (password) => {
  return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

let createToken = async (user) => {
  let token = jwt.sign({ user: user }, process.env.SECKEY, { expiresIn: "7d" });
  return token;
};
// Controllers..
let userRegister = async (req, res) => {
  try {
    let inputStatus = validationResult(req);
    if (!inputStatus.isEmpty()) {
      res.json({ error: inputStatus.array() });
    } else {
      let { name, email, address, username, password, cpassword } = req.body;

      let userStatus = await devUser.findOne({ email });
      userStatus = userStatus ? userStatus : await devUser.findOne({ username });
      if (userStatus != null) {
        return res.json({
          msg: "User Already exists with this email..",
          status: "OK",
        });
      }

      if (password == cpassword) {
        try {
          password = await encryptPassword(password);
          let user = devUser.create({ name, email, address, username, password });
          let token = await createToken(user);
          res.json({
            status: res.status,
            data: {
              msg: "User registered.. successfully..",
              username,
              password: password,
              token,
            },
          });
        } catch (e) {
          res.json({
            statusCode: 500,
            msg: "Internal Server Error",
          });
        }
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

let userLogin = async (req, res) => {
  let inputStatus = validationResult(req);
  if (!inputStatus.isEmpty()) {
    res.json({ error: inputStatus.array() });
  } else {
    let { username, email, password } = req.body;
    try {
      username = username || email;
      let loginStatus;
      if (username) {
        loginStatus = await devUser.findOne({ username });
        if (loginStatus != null) {
          if (await bcrypt.compare(password, loginStatus.password)) {
            // ------------____-___-_________________________________------------------------
            let data = loginStatus;
            return res.json({
              msg: "Logged in successfully with username",
              data: loginStatus,
              subprocess,
            });
          } else {
            return res.json({
              msg: "Wrong Password..",
            });
          }
        } else {
          loginStatus = await devUser.findOne({ email: username });
          if (loginStatus != null) {
            if (await bcrypt.compare(password, loginStatus.password)) {
              return res.json({
                msg: "Logged in successfully with email",
                data: loginStatus,
              });
            } else {
              return res.json({
                msg: "Wrong Password..",
              });
            }
          } else {
            return res.json({
              msg: "User Not Found..",
            });
          }
        }
      } else {
        return res.json({
          msg: "Please Enter Username or Email....",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

// Exports..
module.exports = {
  userRegister,
  userLogin,
};
