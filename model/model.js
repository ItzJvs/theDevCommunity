let { model, Schema } = require("mongoose");

let userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("devUser", userSchema);
