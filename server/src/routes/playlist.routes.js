// routes.js
import express from "express";
import {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
} from "../controllers/playList.controllers.js";

const router = express.Router();

// Create a new playlist
router.post("/playlist", createPlaylist);
router.post("/addVideoToPlaylist", addVideoToPlaylist);

// Get playlists for a user
router.get("/playlist/:userId", getPlaylists);

// Update a playlist
router.put("/playlist/:playlistId", updatePlaylist);

// Delete a playlist
router.delete("/playlist/:playlistId", deletePlaylist);

export {router as PlaylistRouter};
