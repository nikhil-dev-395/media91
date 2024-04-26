import ChannelModel from "../models/channel.models.js";
import ThumbnailModel from "../models/thumbnail.models.js";
import UserModel from "../models/user.models.js";
// import UserModel from "../models/user.models.js";
import VideoModel from "../models/video.models.js";
import { cloudinary } from "../utils/cloudinary.js";
import { upload } from "../utils/multer.js";

// NOTE : thumbnail upload section start from here ...
// import { upload } from "./multerConfig"; // Import the multer configuration

const ThumbnailUpload = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in the request body
    const file = req.file.path;
    // Assuming you have cloudinary and ThumbnailModel imported and defined

    const result = await cloudinary.uploader.upload(file);
    console.log(result.secure_url);

    const thumbnailRecord = await ThumbnailModel.create({
      ThumbnailUrl: result.secure_url,
      userId: userId,
    });

    res.status(200).send({ message: "Thumbnail uploaded", thumbnailRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//video uploading from here ...

const VideoUpload = async (req, res) => {
  try {
    let { title, description, channelId, category, avatarUrl, userId } =
      req.body;
    let thumbnailId = req.params.id;
    // let {  } = req.body;

    // Check if the channel exists
    const channel = await ChannelModel.findById(channelId);
    if (!channel) {
      return res.status(400).json({
        success: false,
        message: "Channel not found",
      });
    }

    // // Find the thumbnail in the database
    const getThumbnail = await ThumbnailModel.findById(thumbnailId);
    // console.log("user >", getThumbnail.userId); // Remove this before production

    // Upload the video to cloud storage
    let file = req.file.path;
    let upload = await cloudinary.uploader.upload(file, {
      resource_type: "video",
    });

    // Create a video record
    let videoRecord = await VideoModel.create({
      title,
      description,
      category,
      channelId,
      avatarUrl,
      channelName: channel.channelName, // Use channel.channelName instead of channelName
      url: upload.secure_url,
      thumbnail: getThumbnail.ThumbnailUrl,
      userId,
    });

    // Update the Channel model to include the video ID
    // Push the video ID to the 'videos' array
    await ChannelModel.findByIdAndUpdate(
      channelId,
      { $push: { videos: videoRecord._id } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Video uploaded successfully",
      videoRecord,
    });
  } catch (error) {
    console.log(
      "\n\n Error occurred at: media.controller | VideoUpload",
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//get videos

const getAllVideos = async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await VideoModel.find();

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;

    // Check if the videoId is valid
    if (!videoId) {
      return res.status(400).json({ message: "Video ID is required" });
    }

    // Fetch the video from the database using Mongoose findById method
    const video = await VideoModel.findById(videoId);

    // Check if video is found
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // If video found, send it as response
    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { ThumbnailUpload, VideoUpload, getAllVideos, getVideo };
