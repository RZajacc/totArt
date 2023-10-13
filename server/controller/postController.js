import postModel from "../models/postModel.js";

const getAllPosts = async (req, res) => {
  const allPosts = await postModel.find();

  res.json({
    number: allPosts.length,
    posts: allPosts,
  });
};

export { getAllPosts };
