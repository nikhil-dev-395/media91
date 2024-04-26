// playlist.model.js
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  channelId: {
    type: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

export default PlaylistModel;
