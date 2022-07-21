var { body } = require("express-validator");

// Validations..
let registerValidations = [
  body("name").not().isEmpty().withMessage("name is required.."),
  body("email").not().isEmpty().withMessage("email is required..").isEmail().withMessage("Enter valid Email.."),
  body("username").not().isEmpty().withMessage("username is required.."),
  body("password").not().isEmpty().withMessage("password is required..").isLength({ min: 8 }).withMessage("Password should greater than 8 chars.."),
];
let loginValidations = [body("password").not().isEmpty().withMessage("password is required..")];
let followValidations = [body("username").not().isEmpty().withMessage("username is required.."), body("toUsername").not().isEmpty().withMessage("toUsername is required..")];
let createPostValidations = [
  body("title").not().isEmpty().withMessage("Title is required.."),
  body("blog").not().isEmpty().withMessage("blog is required.."),
  body("username").not().isEmpty().withMessage("username is required.."),
];
let commentOnPostValidations = [
  body("postId").not().isEmpty().withMessage("postId is required.."),
  body("username").not().isEmpty().withMessage("please Login First.."),
  body("comment").not().isEmpty().withMessage("comment is required.."),
];
let deleteCommentValidations = [
  body("postId").not().isEmpty().withMessage("postId is required.."),
  body("username").not().isEmpty().withMessage("please Login First.."),
  body("commentId").not().isEmpty().withMessage("comment is required.."),
];
let replyCommentValidations = [
  body("postId").not().isEmpty().withMessage("postId is required.."),
  body("username").not().isEmpty().withMessage("please Login First.."),
  body("commentId").not().isEmpty().withMessage("commentId is required.."),
  body("reply").not().isEmpty().withMessage("reply is required.."),
];
let deleteReplyCommentValidations = [
  body("postId").not().isEmpty().withMessage("postId is required.."),
  body("replyId").not().isEmpty().withMessage("replyId id required.."),
  body("commentId").not().isEmpty().withMessage("commentId is required.."),
];
module.exports = {
  registerValidations,
  loginValidations,
  //
  followValidations,
  //
  createPostValidations,
  //
  commentOnPostValidations,
  deleteCommentValidations,
  //
  replyCommentValidations,
  deleteReplyCommentValidations,
};
