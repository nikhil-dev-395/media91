import { config } from "dotenv";
config();

import express from "express";
import connectDB from "./src/database/connectDB.js";
import { MediaRouter } from "./src/routes/media.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { CommentRouter } from "./src/routes/comments.routes.js";
import { subscribeRouter } from "./src/routes/subscribe.routes.js";
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/media", MediaRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/comment", CommentRouter);
app.use("/api/v1/subscribe", subscribeRouter);

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
