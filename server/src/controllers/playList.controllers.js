// controllers/playlist.controller.js
import PlaylistModel from "../models/playlist.models.js";
import UserModel from "../models/user.models.js";

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, description, userId, videos } = req.body;
    let channel = await UserModel.findById(userId);
    const playlist = await PlaylistModel.create({
      name,
      description,
      userId,
      channelId: channel.channelId, /** here i get channel Id from user model  */
      videos,
    });
    res.status(201).json({ playlist });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




/*add video to playlist*/
export const addVideoToPlaylist = async (req, res) => {
  try {
    const { playlistId, videoId } = req.body;

    // Update the playlist to add the new video
    const playlist = await PlaylistModel.findByIdAndUpdate(
      playlistId,
      { $push: { videos: videoId } },
      { new: true }
    );

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({ playlist });
  } catch (error) {
    console.error("Error adding video to playlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Get playlists for a user
export const getPlaylists = async (req, res) => {
  try {
    const userId = req.params.userId;
    const playlists = await PlaylistModel.find({ userId }).populate("videos");
    res.status(200).json({ playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a playlist
export const updatePlaylist = async (req, res) => {
  try {
    const { name, description, videos } = req.body;
    const playlistId = req.params.playlistId;
    const updatedPlaylist = await PlaylistModel.findByIdAndUpdate(
      playlistId,
      { name, description, videos },
      { new: true }
    );
    res.status(200).json({ playlist: updatedPlaylist });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a playlist
export const deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    await PlaylistModel.findByIdAndDelete(playlistId);
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
