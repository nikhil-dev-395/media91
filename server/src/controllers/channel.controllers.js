import ChannelModel from "../models/channel.models.js";
import VideoModel from "../models/video.models.js";
/*get channels*/
const getChannelData = async (req, res) => {
  try {
    let channelId = req.params.channelId;

    if (typeof channelId === "undefined") {
      res.send("channelId is undefined");
    }

    if (!channelId) {
      res.status(400).json({ message: "please provide channelId" });
    }

    let findChannel = await ChannelModel.findById(channelId);
    res.status(201).json({ message: "channel ", findChannel });
  } catch (error) {
    console.log("error");
    res
      .status(500)
      .json({ message: "server error at channel.controller.js", error });
  }
};

const getAllChannels = async (req, res) => {
  try {
    let channel = await ChannelModel.find();

    if (!channel) {
      return res.send("no channel is available");
    }

    res.status(201).json({ success: true, message: "  all channel ", channel });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "error  at channel.controller || getAllChannel",
      error,
    });
    console.log("error at channel.controller || getAllChannel");
  }
};

export { getChannelData,getAllChannels };
