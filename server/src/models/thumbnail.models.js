import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema(
  {
    ThumbnailUrl: {
      type: String,
      required: true,
    },
    userId: {
     type:String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const ThumbnailModel = mongoose.model("Thumbnail", thumbnailSchema);

export default ThumbnailModel;
