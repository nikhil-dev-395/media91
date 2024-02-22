import { subscribeModel } from "../models/subscribe.models.js";
import UserModel from "../models/user.models.js";

const subscribeToChannel = async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const userId = req.body.userId;

    // Check if the channel and user exist
    const channel = await subscribeModel.findById(channelId);
    const user = await UserModel.findById(userId);

    if (!channel || !user) {
      return res.status(404).send({
        message: "Channel or user not found",
      });
    }

    // Check if the user is already subscribed
    if (channel.subscriber.includes(userId)) {
      return res.status(400).send({
        message: "User is already subscribed to this channel",
      });
    }

    // Add the user to the subscribers array
    channel.subscriber.push(userId);
    await channel.save();

    res.status(200).send({
      message: "User subscribed to the channel successfully",
      data: channel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error in subscribeToChannel",
      error: error.message,
    });
  }
};

export { subscribeToChannel };
