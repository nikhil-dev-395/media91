// routes/explore.js
import express from "express";
import { exploreVideos } from "../controllers/explore.controller.js";

const router = express.Router();

// POST /explore
router.post("/explore", exploreVideos);

export {router as exploreRouter};
