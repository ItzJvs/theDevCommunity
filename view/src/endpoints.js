let localhost = "http://localhost:5000";
let remotehost = "";

const loginUrl = `${localhost}/login`;
const registerUrl = `${localhost}/register`;
const followUrl = `${localhost}/follow`;
const unfollowUrl = `${localhost}/unfollow`;
const createPostUrl = `${localhost}/createPost`;
const deletePostUrl = `${localhost}/deletePost`;
//
const commentPostUrl = `${localhost}/comment`;
const deleteCommentPostUrl = `${localhost}/deleteComment`;
const replyCommentPostUrl = `${localhost}/replyComment`;
const deleteReplyCommentPostUrl = `${localhost}/deleteReplyComment`;

const getAllUsersUrl = `${localhost}/getAll`;
const getAllPostsUrl = `${localhost}/getAllPosts`;

export {
  loginUrl,
  registerUrl,
  followUrl,
  unfollowUrl,
  createPostUrl,
  deletePostUrl,
  commentPostUrl,
  deleteCommentPostUrl,
  replyCommentPostUrl,
  deleteReplyCommentPostUrl,
  getAllUsersUrl,
  getAllPostsUrl,
};
