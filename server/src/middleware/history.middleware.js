// middleware.js
import HistoryModel from "../models/History.models.js";
import UserModel from "../models/user.models.js";

export const recordHistory = async (req, res, next) => {
  try {
    const { watcher, userId, videoId } = req.body;
    // Assuming these are available in the request

    let user = await UserModel.findById(userId);

    await HistoryModel.create({ watcher: user.email, userId, videoId });
    next();
  } catch (error) {
    console.error("Error recording history:", error);
    // Handle error
    res.status(500).json({ message: "Internal Server Error" });
  }
};
