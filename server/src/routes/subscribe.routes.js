// routes/subscriber.routes.js

import express from "express";
import { subscribeToChannel } from "../controllers/subscribe.controller.js";

const router = express.Router();

// POST /api/subscribers/subscribe
router.post("/subscribe", subscribeToChannel);
// router.post("/f", find);

export { router as subscribeRouter };
