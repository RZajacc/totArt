import postModel from "../models/postModel.js";

const getAllPosts = async (req, res) => {
  const allPosts = await postModel.find();

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
  });

  try {
    const savedPost = newPost.save();
    res.status(201).json({
      msg: "new image uploaded",
    });
  } catch (error) {}
};

const getDetails = async (req, res) => {
  const postData = await postModel.findOne({ _id: req.body.id });
  res.json({
    title: postData.title,
    description: postData.description,
    location: postData.location,
    imageUrl: postData.imageUrl,
  });
};

const getAllUserPosts = async (req, res) => {
  const posts = await postModel
    .find({})
    .populate({ path: "user", select: ["email"] });
  console.log(posts);
};

export { getAllPosts, addNewPost, getDetails, getAllUserPosts };
