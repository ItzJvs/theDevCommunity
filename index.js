var express = require("express");
var app = express();
var router = require("./controller/routes/routes");
var connect = require("./config/db");
var cors = require("cors");
require("dotenv").config();
connect();
let PORT = process.env.PORT || 5000;
app.use(require("body-parser").json());
app.use("/", router);
app.use(cors());
app.listen(PORT, () => {
  console.log(`OhYeah app listening on Port : ${PORT}`);
});
