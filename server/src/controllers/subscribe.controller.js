import SubscribeModel from "../models/subscribe.models.js";
import UserModel from "../models/user.models.js";
import ChannelModel from "../models/channel.models.js";

const subscribeToChannel = async (req, res) => {
  try {
    const { UserId, channelId } = req.body;
    if (!UserId || !channelId) {
      return res
        .status(400)
        .json({ message: "Please provide userId and channelId" });
    }

    // Check if the user is already subscribed to the channel
    const existingSubscription = await SubscribeModel.findOne({
      UserId,
      channelId,
    });
    if (existingSubscription) {
      return res
        .status(400)
        .json({ message: "User is already subscribed to this channel" });
    }

    // Create a subscription record
    const subscription = await SubscribeModel.create({ UserId, channelId });

    // Push the UserId into the subscribers array in the Channel model
    const channel = await ChannelModel.findByIdAndUpdate(
      channelId,
      { $push: { subscribers: UserId } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Channel subscribed", subscription, channel });
  } catch (error) {
    console.log("Error at subscribe.controller.js --> \n\n", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { subscribeToChannel };
