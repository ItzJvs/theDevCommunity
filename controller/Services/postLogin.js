var { validationResult } = require("express-validator");
var { devUser, devPost } = require("../../model/model");
const bcrypt = require("bcrypt");

let followUser = async (req, res) => {
  let inputStatus = validationResult(req);
  if (!inputStatus.isEmpty()) {
    res.json({
      errors: inputStatus.array(),
    });
  } else {
    let currerntUser = req.body.username;
    let toFollow = req.body.toUsername;
    let userExists = await devUser.findOne({ username: currerntUser });
    let toUserExists = await devUser.findOne({ username: toFollow });
    if (userExists && toUserExists) {
      try {
        await devUser.findOneAndUpdate({ username: toFollow }, { $addToSet: { followers: { id: userExists._id, username: userExists.username } } }, function (err, docs) {
          if (err)
            res.json({
              statusCode: 500,
              msg: "Internal Server Error",
            });
        });
        await devUser.findOneAndUpdate({ username: currerntUser }, { $addToSet: { followings: { id: toUserExists._id, username: toUserExists.username } } }, function (err, docs) {
          if (err)
            res.json({
              statusCode: 500,
              msg: "Internal Server Error",
            });
        });
        res.json({
          statusCode: 200,
          msg: "Followed..",
        });
      } catch (e) {
        res.json({
          statusCode: 500,
          massage: e,
        });
      }
    } else {
      if (userExists) {
        res.json({
          massage: "User not exists..",
        });
      } else {
        res.json({
          massage: "Please LoginFirst..",
        });
      }
    }
  }
};
let unFollowUser = async (req, res) => {
  let inputStatus = validationResult(req);
  if (!inputStatus.isEmpty()) {
    res.json({
      errors: inputStatus.array(),
    });
  } else {
    let currerntUser = req.body.username;
    let toFollow = req.body.toUsername;
    let userExists = await devUser.findOne({ username: currerntUser });
    let toUserExists = await devUser.findOne({ username: toFollow });
    if (userExists && toUserExists) {
      try {
        await devUser.findOneAndUpdate({ username: toFollow }, { $pull: { followers: { id: userExists._id, username: userExists.username } } }, function (err, docs) {
          if (err)
            res.json({
              statusCode: 500,
              msg: "Internal Server Error",
            });
        });
        await devUser.findOneAndUpdate({ username: currerntUser }, { $pull: { followings: { id: toUserExists._id, username: toUserExists.username } } }, function (err, docs) {
          if (err)
            res.json({
              statusCode: 500,
              msg: "Internal Server Error",
            });
        });
        res.json({
          statusCode: 200,
          msg: "UnFollowed..",
        });
      } catch (e) {
        res.json({
          statusCode: 500,
          massage: e,
        });
      }
    } else {
      if (userExists) {
        res.json({
          massage: "User not exists..",
        });
      } else {
        res.json({
          massage: "Please LoginFirst..",
        });
      }
    }
  }
};

let createPost = async (req, res) => {
  let validationStatus = validationResult(req);
  try {
    if (!validationStatus.isEmpty()) {
      res.json({
        msg: "400",
        errors: validationStatus.array(),
      });
    } else {
      let { coverPhoto, title, tags, blog, username } = req.body;

      let titleStatus = await devPost.findOne({ title });
      let userStatus = await devUser.findOne({ username });
      if (titleStatus != null) {
        res.json({
          statusCode: 400,
          msg: "Please Choose other Title..",
        });
      } else {
        if (userStatus) {
          devPost.create({
            coverPhoto,
            title,
            blog,
            tags,
            user: username,
            comments: [],
            reactions: [],
          });
          res.json({
            statusCode: 200,
            msg: "Post Created success fully..",
          });
        } else {
          res.json({
            statusCode: 400,
            msg: "Please Login First..",
          });
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};
let deletePost = (req, res) => {
  let postId = req?.body?.postId;
  if (postId != null) {
    devPost.findOneAndDelete({ _id: postId }, { $pull: { id: postId } }, (err, data) => {
      res.json({ statusCode: 201, msg: "post Deleted Successfully..", err, data });
    });
  } else {
    res.json({ statusCode: 400, msg: "postId Is requied.." });
  }
};
let commentOnPost = async (req, res) => {
  let status = validationResult(req);
  if (!status.isEmpty()) {
    res.json({ statusCode: 400, msg: status.array() });
  } else {
    let { postId, username, comment } = req.body;

    let replys = [],
      reactions = [];
    let commentStatus = await devPost.findById(postId);
    if (commentStatus) {
      let commentId = await bcrypt.hash(postId, await bcrypt.genSalt(5));
      let comments = { id: commentId, username, comment, replys, reactions };
      if (await devUser.findOne({ username })) {
        devPost.findOneAndUpdate({ _id: postId }, { $push: { comments } }, (err, data) => {
          res.json({ statusCode: 201, msg: "comment Successfull", err, data });
        });
      } else {
        res.json({ statusCode: 401, msg: "Please Login.." });
      }
    } else {
      res.json({ statusCode: 500, msg: "Internal Server Error" });
    }
  }
};
let deleteComment = async (req, res) => {
  let status = validationResult(req);
  if (!status.isEmpty()) {
    res.json({
      statusCode: 400,
      msg: status.array(),
    });
  } else {
    let { postId, commentId } = req.body;
    devPost.findOneAndUpdate({ id: postId }, { $pull: { comments: { id: commentId } } }, (err, data) => {
      res.json({ statusCode: 201, msg: "comment Successfully Deleted", err, data });
    });
  }
};

let replyComment = async (req, res) => {
  let status = validationResult(req);
  if (!status.isEmpty()) {
    res.json({
      statusCode: 400,
      msg: status.array(),
    });
  } else {
    let { postId, commentId, username, reply } = req.body;
    let replyId = await bcrypt.hash(postId + commentId, await bcrypt.genSalt(5));
    let data = await devPost.findOneAndUpdate(
      { _id: postId },
      { $push: { "comments.$[element].replys": { replyId, username, reply } } },
      { arrayFilters: [{ "element.id": commentId }] }
    );
    res.json({ data });
  }
};
let deleteReplyComment = async (req, res) => {
  let status = validationResult(req);
  if (!status.isEmpty()) {
    res.json({
      statusCode: 400,
      msg: status.array(),
    });
  } else {
    let { postId, commentId, replyId } = req.body;
    let data = await devPost.findOneAndUpdate({ _id: postId }, { $pull: { "comments.$[element].replys": { replyId } } }, { arrayFilters: [{ "element.id": commentId }] });
    res.json({ data });
  }
};
// Utilities
// let findComments = async (id, username) => {
//   let post = await devPost.findOne({ id });
//   if (post) {
//     let userComments = post.comments.filter((comment) => {
//       if (comment.username == username) {
//         return comment;
//       }
//     });
//     return userComments;
//   }
// };

//  temp endpoints..

let getAllUsers = async (req, res) => {
  devUser.find({}, function (err, user) {
    res.send(user);
  });
};

let getAllPosts = async (req, res) => {
  devPost.find({}, function (err, post) {
    res.send(post);
  });
};

module.exports = {
  followUser,
  unFollowUser,
  createPost,
  deletePost,
  getAllPosts,
  commentOnPost,
  deleteComment,
  replyComment,
  deleteReplyComment,
  // temp
  getAllUsers,
};
