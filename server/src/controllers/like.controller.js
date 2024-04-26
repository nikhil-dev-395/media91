import VideoModel from "../models/video.models.js";

const likeVideo = async (req, res) => {
  try {
    let videoId = req.params.videoId;

    const { userId } = req.body;
    if (!videoId || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide a videoId and userId" });
    }

    // Find the video by its ID
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if the user has already liked the video
    const isLiked = video.likes.includes(userId);

    if (isLiked) {
      return res
        .status(400)
        .json({ message: "You have already liked this video" });
    }

    // Add the user's ID to the likes array
    video.likes.push(userId);

    // Save the updated video
    await video.save();

    res.status(200).json({ message: "Video liked successfully", video });
  } catch (error) {
    console.error("Error at like.controller.js:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { likeVideo };
