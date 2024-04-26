// import mongoose from "mongoose";

// const CommentSchema = new mongoose.Schema({
//   comment: {
//     type: String,
//     required: [true, "Please provide a comment"],
//   },
// userId:{
//    type:mongoose.Schema.Types.ObjectId,
//    ref:"User"
// },
//   username: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const CommentModel = mongoose.model("Comment", CommentSchema);

// export default CommentModel;
// comment.model.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Please provide a comment"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;
