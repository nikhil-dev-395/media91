import ChannelModel from "../models/channel.models.js";
import UserModel from "../models/user.models.js";
import { cloudinary } from "../utils/cloudinary.js";

const SignUpUser = async (req, res) => {
  try {
    const { channelName, name, email, password, gender, mobile, address } =
      req.body;

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let file = req.file.path;
    let cloudinaryResult = await cloudinary.uploader.upload(file);
    console.log(cloudinaryResult.secure_url);

    const newChannel = await ChannelModel.create({
      channelName,
      owner: name,
    });

    // Create a new channel for the user
    const user = await UserModel.create({
      channelName: newChannel._id,
      name,
      email,
      password,
      gender,
      avatar: cloudinaryResult.secure_url,
      mobile,
      address,
    });

    // Create a new user record and associate it with the channel

    // Omit the password field from the response
    let saveUser = user.toObject();
    delete saveUser.password;

    // Log user details (excluding password) for verification
    console.log({ user: saveUser });

    await ChannelModel.findByIdAndUpdate(newChannel._id, {
      $push: {
        user: user._id,
        avatar: user.avatar,
        description: user.description,
      },
    });

    // Return success response with user details
    res
      .status(201)
      .json({ message: "User signed up successfully", user: saveUser });
  } catch (error) {
    console.error("Error occurred during user signup:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// const SignUpUser = async (req, res) => {
//   try {
//     const {
//       channelName,
//       name,
//       email,
//       channelId,
//       password,
//       gender,
//       mobile,
//       address,
//     } = req.body;

//     // Check if a user with the given email already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Upload avatar to Cloudinary
//     const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
//     const avatarUrl = cloudinaryResult.secure_url;

//     // Create a new user record
//     const user = await UserModel.create({
//       channelName,
//       channelId,
//       name,
//       email,
//       password,
//       gender,
//       avatar: avatarUrl,
//       mobile,
//       address,
//     });

//     // Create a new channel for the user
//     const newChannel = await ChannelModel.create({
//       channelName,
//       owner: name,
//       avatar,
//       user: user._id, // Store the userId in the ChannelModel document
//     });

//     // Update user document with channelId

//      user.channelId = newChannel._id;
//     //  await user.save();

//     await user.save();

//     // Omit the password field from the response
//     const savedUser = user.toObject();
//     delete savedUser.password;

//     // Return success response with user details
//     res
//       .status(201)
//       .json({ message: "User signed up successfully", user: savedUser });
//   } catch (error) {
//     console.error("Error occurred during user signup:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// as a name suggest this method is used for singing a user with the help of email and password

const SignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await UserModel.findOne({ email, password }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User logged in successfully", user });
    //! Avoid logging sensitive information in a production environment
    console.log("User logged in:", user.email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { SignUpUser, SignInUser };
