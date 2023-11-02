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

export { getAllPosts, addNewPost };
