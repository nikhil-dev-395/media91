import {
  CreateComment,
  getComment,
} from "../controllers/comment.controllers.js";
import express from "express";
const router = express.Router();

router.post("/createComment/:userId", CreateComment);
router.get("/getComment", getComment);

export { router as CommentRouter };
