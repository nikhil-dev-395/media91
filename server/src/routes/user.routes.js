import { upload } from "../utils/multer.js";
import express from "express";
import { SignUpUser, SignInUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", upload.single("avatar"), SignUpUser);
router.post("/signin", SignInUser);

export { router as userRouter };
