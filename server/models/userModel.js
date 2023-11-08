import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
  },
  userWebsite: {
    type: String,
    required: false,
  },
  userBio: {
    type: String,
    required: false,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  favs: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
