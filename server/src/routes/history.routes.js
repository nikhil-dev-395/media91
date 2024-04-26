// routes.js
import express from "express";
import { recordHistory } from "../middleware/history.middleware.js";
import HistoryModel from "../models/History.models.js";

const router = express.Router();

// Route to record history
router.post("/watch", recordHistory, (req, res) => {
  res.status(200).json({ message: "History recorded successfully" });
});

// Route to get user's history
router.get("/history/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const history = await HistoryModel.find({ userId }).populate("videoId");
    res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/history", async (req, res) => {
  try {
    // Fetch all viewing history data from the database
    const historyData = await HistoryModel.find().sort({ timestamp: -1 });

    // Send the viewing history data as a response
    res.status(200).json(historyData);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching viewing history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as historyRouter };
