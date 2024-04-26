//comment.controller.js

import VideoModel from "../models/video.models.js";
import CommentModel from "../models/comments.models.js";

const postCommentOnVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { commentText, userId } = req.body;

    // Check if the video exists
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Create the comment
    const comment = new CommentModel({
      comment: commentText,
      userId,
      videoId,
    });

    // Save the comment
    await comment.save();

    // Update the video's comments array
    video.comments.push(comment._id);
    await video.save();

    res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      comment,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const postComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { commentText } = req.body;

    // Check if the video exists
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // Create the comment
    const comment = new CommentModel({
      comment: commentText,
      videoId,
    });

    // Save the comment
    await comment.save();

    // Update the video's comments array
    video.comments.push(commentText);
    await video.save();

    res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      comment,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};






export { postCommentOnVideo, postComment };
