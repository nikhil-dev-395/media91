import express from "express";
import { likeVideo } from "../controllers/like.controller.js";

const router = express.Router();

// POST route to like a video
router.post("/videos/like/:videoId", likeVideo);

export {router as likeRouter};
