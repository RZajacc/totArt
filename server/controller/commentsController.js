import commentModel from "../models/commentModel.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

const addNewComment = async (req, res) => {
  console.log(req.body);

  const newComment = new commentModel({
    author: req.body.author,
    comment: req.body.comment,
    relatedPost: req.body.relatedPost,
  });

  try {
    const savedComment = newComment.save();
    res.status(201).json({
      msg: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (req, res) => {
  let comment = await commentModel
    .findById(req.body._id)
    .populate({ path: "author", select: ["_id"] })
    .populate({ path: "relatedPost", select: ["_id"] });

  // console.log(comment);
  let updateUser = await userModel.findOneAndUpdate(
    { _id: comment.author._id },
    { $pull: { comments: comment._id } },
    { new: true }
  );
  console.log(updateUser);
  let updatePost = await postModel.findOneAndUpdate(
    { _id: comment.relatedPost._id },
    { $pull: { comments: comment._id } },
    { new: true }
  );

  let commentDelete = await commentModel.findByIdAndDelete(req.body._id);

  res.json({ msg: "Comment deleted successfully" });
};

export { addNewComment, deleteComment };
