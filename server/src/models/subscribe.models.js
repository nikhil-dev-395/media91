// models/subscriber.model.js

import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
  {
    UserId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

const SubscribeModel = mongoose.model("Subscribe", subscribeSchema);

export default SubscribeModel;
