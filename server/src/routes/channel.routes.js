// Import necessary modules
import express from "express";
const router = express.Router();
import { getAllChannels, getChannelData } from "../controllers/channel.controllers.js";

// Define the route for getting channel data
router.get("/channel/:channelId", getChannelData);
router.get("/channel", getAllChannels);

export { router as channelRouter };
