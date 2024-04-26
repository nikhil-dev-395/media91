

// routes.js
import express from "express";
import { postComment, postCommentOnVideo } from "../controllers/comment.controllers.js";

const router = express.Router();

// Route to post a comment on a video we need to write here videoId and userId
router.post("/videoComment/:videoId", postCommentOnVideo);
router.post("/video/:videoId", postComment);


export { router as CommentRouter };
