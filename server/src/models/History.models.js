// history.model.js
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  watcher: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
  watchedAt: { type: Date, default: Date.now },
});

const HistoryModel = mongoose.model("History", historySchema);

export default HistoryModel;
