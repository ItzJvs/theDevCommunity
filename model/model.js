let { model, Schema, Model } = require("mongoose");

let required = true;
// To create the User Collection if not exists
let userSchema = new Schema(
  {
    name: { type: String, required },
    email: { type: String, required },
    profileImage: { type: String },
    phone: { type: String },
    username: { type: String, required },
    password: { type: String, required },
    followings: { type: Array },
    followers: { type: Array },
    saved: { type: Array },
  },
  { timestamps: true }
);
// To create the Posts Collection if not exists

let postsSchema = new Schema(
  {
    coverImage: { type: String },
    title: { type: String, required },
    tags: { type: Array },
    blog: { type: String, required },
    user: { type: userSchema, required },
    comments: { type: Array },
    reactions: { type: Array },
  },
  { timestamps: true }
);

let devUser = model("devUser", userSchema);
let devPost = model("devPost", postsSchema);
module.exports = { devUser, devPost };

// Unwanted Code..
// To create the Comments Collection if not exists

// let commentSchema = new Schema({
//   userName: { type: String, required },
//   postId: { type: String, required },
//   comment: { type: String, required },
// });
// // To create the Reactions Collection if not exists

// let reactionSchema = new Schema({
//   userName: { type: String, required },
//   postId: { type: String, required },
//   reaction: { type: String, required },
// });

// let comments = model("devComments", commentSchema);
// let reactions = model("devReactions", reactionSchema);
