import express from "express";
import { subscribeToChannel } from "../controllers/subscribe.controller.js";
const router = express.Router();

router.post("/subscribeToChannel", subscribeToChannel);

export {router as subscribeRouter}
