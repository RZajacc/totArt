import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  favs: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
