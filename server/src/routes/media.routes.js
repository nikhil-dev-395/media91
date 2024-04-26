import {
  ThumbnailUpload,
  VideoUpload,
  getAllVideos,
  getVideo,
} from "../controllers/media.controllers.js";
import { Router } from "express";
import { upload } from "../utils/multer.js";

const router = Router();

router.post("/thumbnail", upload.single("thumbnail"), ThumbnailUpload);
router.post("/video/:id", upload.single("video"), VideoUpload);
router.get("/video", getAllVideos);
router.get("/video/:videoId", getVideo);

export { router as MediaRouter };
