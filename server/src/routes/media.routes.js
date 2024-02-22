import {
  ThumbnailUpload,
  VideoUpload,
} from "../controllers/media.controllers.js";
import { Router } from "express";
import { upload } from "../utils/multer.js";

const router = Router();

router.post("/thumbnail/:userId", upload.single("thumbnail"), ThumbnailUpload);
router.post("/video/:id", upload.single("video"), VideoUpload);

export { router as MediaRouter };
