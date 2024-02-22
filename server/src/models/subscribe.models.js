import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subscriber: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    videos: {
      type: String,
    },
  },
  { timestamps: true }
);

export const subscribeModel = mongoose.model("Subscribe", subscribeSchema);
