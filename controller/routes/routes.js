// Imports..
var express = require("express");
var router = express.Router();
// Validations and Controllers..
const { userRegister, userLogin } = require("../controller");
const {
  followUser,
  getAllUsers,
  unFollowUser,
  createPost,
  getAllPosts,
  commentOnPost,
  deleteComment,
  replyComment,
  deleteReplyComment,
  deletePost,
} = require("../Services/postLogin");
const {
  loginValidations,
  registerValidations,
  //  follow & unfollow validations are same..
  followValidations,
  //
  createPostValidations,
  //
  commentOnPostValidations,
  deleteCommentValidations,
  replyCommentValidations,
  deleteReplyCommentValidations,
} = require("../Validations");

//  Routes..
router.post("/register", registerValidations, userRegister);
router.post("/login", loginValidations, userLogin);
//
router.post("/follow", followValidations, followUser);
router.post("/unfollow", followValidations, unFollowUser);
//
router.post("/createPost", createPostValidations, createPost);
router.post("/deletePost", deletePost);
router.post("/getAllPosts", getAllPosts);
//
router.post("/comment", commentOnPostValidations, commentOnPost);
router.post("/deleteComment", deleteCommentValidations, deleteComment);
//
router.post("/replyComment", replyCommentValidations, replyComment);
router.post("/deleteReplyComment", deleteReplyCommentValidations, deleteReplyComment);

// temp
router.post("/getAll", getAllUsers);

// Exports..
module.exports = router;
