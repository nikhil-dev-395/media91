import ThumbnailModel from "../models/thumbnail.models.js";
import UserModel from "../models/user.models.js";
import VideoModel from "../models/video.models.js";
import { cloudinary } from "../utils/cloudinary.js";

// thumbnail upload section start from here ...
const ThumbnailUpload = async (req, res) => {
  try {
    let userID = req.params.userId;
    let file = req.file.path;
    let result = await cloudinary.uploader.upload(file);
    console.log(result.secure_url);
    let thumbnailRecord = await ThumbnailModel.create({
      ThumbnailUrl: result.secure_url,
      userId: userID,
    });
    res.status(200).send({ message: "thumbnail uploaded", thumbnailRecord });
  } catch (error) {
    console.log(
      "\n Error Occurred  at : media.controller | thumbnailUpload" + error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// video uploading from here ...
const VideoUpload = async (req, res) => {
  try {
    let { title, description } = req.body;
    // from here we will try find url for thumbnail
    let thumbnailId = req.params.id;
    const getThumbnail = await ThumbnailModel.findById(thumbnailId);
    console.log("user >", getThumbnail.userId);

    // we successfully got the thumbnail url from the database ...
    let file = req.file.path;
    let upload = await cloudinary.uploader.upload(file, {
      resource_type: "video",
    });

    let videoRecord = await VideoModel.create({
      title,
      description,
      url: upload.secure_url,
      thumbnail: getThumbnail.ThumbnailUrl,
      userId: getThumbnail.userId,
    });

    console.log(videoRecord); // remove this before production

    res.status(200).send({
      success: true,
      message: "video uploaded successfully ",
      videoRecord,
    });
  } catch (error) {
    console.log(
      "Error Occurred  at : media.controller | VideoUpload" + error.message
    );
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { ThumbnailUpload, VideoUpload };
