// controllers/exploreController.js
import VideoModel from "../models/video.models.js";

export const exploreVideos = async (req, res) => {
  try {
    const { category } = req.body;

    // Fetch videos based on the specified category
    const videos = await VideoModel.find({ category }).limit(20); // Fetch top 20 videos of the specified category

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
