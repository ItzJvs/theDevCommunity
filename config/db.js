let mongoose = require("mongoose");
require("dotenv");
module.exports = connect = () => {
  try {
    let res = mongoose.connect(process.env.DBURL, () => {
      console.log("Connected with Db successfully..");
    });
  } catch (err) {
    console.log(err);
  }
};
