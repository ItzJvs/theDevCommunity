let mongoose = require("mongoose");
require("dotenv");
module.exports = connect = () => {
  try {
    mongoose.connect(
      process.env.DBURL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Connected with Db successfully..");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
