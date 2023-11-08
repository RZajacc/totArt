import commentModel from "../models/commentModel.js";

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

export { addNewComment };
