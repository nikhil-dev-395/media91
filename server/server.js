import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import connectDB from "./src/database/connectDB.js";
import { MediaRouter } from "./src/routes/media.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { CommentRouter } from "./src/routes/comments.routes.js";
import { subscribeRouter } from "./src/routes/subscribe.routes.js";
import { PlaylistRouter } from "./src/routes/playlist.routes.js";
import { historyRouter } from "./src/routes/history.routes.js";
import { exploreRouter } from "./src/routes/explore.route.js";
import { channelRouter } from "./src/routes/channel.routes.js";
import { searchRouter } from "./src/routes/search.routes.js";
import { likeRouter } from "./src/routes/like.routes.js";
// historyRouter
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/media", MediaRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/comment", CommentRouter);
app.use("/api/v1/subscribe", subscribeRouter);
app.use("/api/v1/playlist", PlaylistRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/explore", exploreRouter);
app.use("/api/v1/channel", channelRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/like", likeRouter);

// starting server from here ..
const startServer = async () => {
  try {
    await connectDB();
    await app.listen(port, () => {
      console.log(` \napp listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error Occurred at server.js");
  }
};
startServer();
