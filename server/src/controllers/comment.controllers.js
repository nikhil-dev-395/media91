import CommentModel from "../models/comments.models.js";
import UserModel from "../models/user.models.js";

const CreateComment = async (req, res) => {
  try {
    let { comment } = req.body;
    let userId = req.params.userId;
    let username = await UserModel.findById(userId);
    const commentUser = await CommentModel.create({
      comment,
      userId,
      username: username.name,
    });
    res
      .status(201)
      .json({ message: "Comment created successfully", commentUser });
    console.log("\n\n Comment created successfully \n comment :-", commentUser); //!remember to remove this console
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, error: "this is from createComment" });
    console.log({
      message: error.message,
      error: "this is from createComment",
    });
  }
};
//!! check before making any changes !! if any changes needed

const getComment = async (req, res) => {
  try {
    let comment = await CommentModel.find({ videoId: req.params.id }).populate(
      "userId"
    );
    res.status(200).json({ message: "Comment fetched successfully", comment });
  } catch (error) {
    console.log(
      "error occurred at file comment.controller.js || getComment",
      error.message
    );
    res.send(
      "error occurred at file comment.controller.js || getComment",
      error.message
    );
  }
};

//! remember to check this method also
 
const postCommentOnVideo = async (req, res) => {
  res.send("hello");
};

export { CreateComment, getComment, postCommentOnVideo };
