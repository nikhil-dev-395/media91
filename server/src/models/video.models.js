import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  // views: {
  //     type: Number,
  //     required: true,
  //     default: 0,
  // },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // category: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //     ref: "Category",
  // },
  //   comments: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Comment",
  //     },
  //   ],
  // likes: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User",
  //     },
  // ],
  // dislikes: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User",
  //     },
  // ],
});

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;
