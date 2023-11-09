import commentModel from "../models/commentModel.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

const getAllPosts = async (req, res) => {
  const allPosts = await postModel.find();
  // const allPosts = await postModel
  //   .find()
  //   .populate({ path: "author", select: ["userName"] });

  res.json({
    number: allPosts.length,
    posts: allPosts,
  });
};

const addNewPost = async (req, res) => {
  console.log(req.body);
  const newPost = new postModel({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    imageUrl: req.body.imageUrl,
    author: req.body.author,
  });

  try {
    const savedPost = newPost.save();
    res.status(201).json({
      msg: "new post uploaded uploaded",
      postId: newPost._id,
    });
  } catch (error) {}
};

const getDetails = async (req, res) => {
  const postData = await postModel
    .findOne({ _id: req.body.id })
    .populate({ path: "author", select: ["userName", "userImage"] })
    .populate({
      path: "comments",
      populate: { path: "author", select: ["userName", "userImage"] },
    });

  console.log(postData);
  res.json({
    _id: postData._id,
    title: postData.title,
    description: postData.description,
    location: postData.location,
    imageUrl: postData.imageUrl,
    author: postData.author,
    favs: postData.favs,
    comments: postData.comments,
  });
};

const updatePost = async (req, res) => {
  const filter = { _id: req.body._id };
  const elementName = req.body.elementName;
  const elementValue = req.body.elementValue;
  const update = { [`${elementName}`]: elementValue };

  // * This section covers connecting user with his posts
  if (req.body.elementName === "comments") {
    let updatedPost = await postModel.findOneAndUpdate(
      filter,
      { $push: { comments: elementValue } },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: "Posts updated properly",
    });
  }
};

export { getAllPosts, addNewPost, getDetails, updatePost };
