import UserModel from "../models/user.models.js";
import { cloudinary } from "../utils/cloudinary.js";

const SignUpUser = async (req, res) => {
  try {
    // upload avatar for user
    let file = req.file.path;
    let cloudinaryResult = await cloudinary.uploader.upload(file);
    console.log(cloudinaryResult.secure_url);
    // now get details for user now
    const { channelName, name, email, password, gender, mobile, address } =
      req.body;
    const user = await UserModel.create({
      channelName,
      name,
      email,
      password,
      gender,
      avatar: cloudinaryResult.secure_url,
      mobile,
      address,
    });

    let saveUser = await user.save();

    saveUser = saveUser.toObject();
    delete saveUser.password;

    res.status(201).json({ message: "User signed up successfully", saveUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// as a name suggest this method is used for singing a user with the help of email and password


const SignInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await UserModel.findOne({ email,password }).select("-password");

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
