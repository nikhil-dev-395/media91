// Import necessary modules
import express from "express";
import VideoModel from "../models/video.models.js";
  
import { Router } from "express";
let router = Router()
router.get("/videos", async (req, res) => {
  try {
    const searchTitle = req.query.title;
    if (!searchTitle) {
      return res
        .status(400)
        .json({ success: false, message: "Title parameter is required" });
    }

    const videos = await VideoModel.find({
      title: { $regex: new RegExp(searchTitle, "i") },
    });
    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Error searching for videos:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Export the router
export { router as searchRouter };
