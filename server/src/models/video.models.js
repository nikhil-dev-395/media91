
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  category: {
    type: String,
    enum: ["education", "entertainment", "music", "sports", "news", "others"],
  },
  userId: {
    type: String,
  },
  channelId: {
    type: String,
  },
  channelName: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  comments: [String],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;
