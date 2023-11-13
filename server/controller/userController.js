import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { bcrypt_hash, bcrypt_verifyPassword } from "../utils/bcrypt_config.js";
import { response } from "express";
import { generateToken } from "../utils/tokenServices.js";
import postModel from "../models/postModel.js";
import commentModel from "../models/commentModel.js";

const uploadImage = async (req, res) => {
  //   * Upload file to cloudinary
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: req.body.folder,
  };

  if (req.file) {
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(req.file.path, options);
      console.log(result);
      res.status(200).json({
        message: "Image uploaded successfully",
        userImage: result.secure_url,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json({
      error: "File type not supported",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.publicId);
    console.log(result);
    res.status(200).json({
      message: "Image deleted successfully",
      userImage: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  console.log("Request body--->", req.body);

  try {
    const hashedPassword = await bcrypt_hash(req.body.password);
    if (hashedPassword) {
      // * Check if a new user exists already
      const existingUser = await userModel.findOne({ email: req.body.email });
      if (existingUser) {
        res.status(200).json({
          msg: "Email already exists in the database",
        });
      } else {
        try {
          const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            userImage: req.body.userImage,
            userWebsite: req.body.website,
            userBio: req.body.bio,
          });

          const savedUser = await newUser.save();
          res.status(201).json({
            msg: "New user registered",
            user: {
              userName: savedUser.userName,
              email: savedUser.email,
              userImage: savedUser.userImage,
              userWebsite: savedUser.website,
              userBio: savedUser.bio,
            },
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            msg: "Something went wrong",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong!",
    });
  }
};

const login = async (req, res) => {
  // console.log(req.body);
  // * Check if the user exists in the database
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(404).json({
        msg: "No user found with provided email!",
      });
    } else {
      // *Check password
      const checkPassword = await bcrypt_verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!checkPassword) {
        res.status(404).json({
          msg: "Wrong password, try again!",
        });
      }

      if (checkPassword) {
        // * GENERATE TOKEN
        const token = generateToken(existingUser.id);
        if (token) {
          res.status(200).json({
            msg: "Successfull login",
            user: {
              userName: existingUser.userName,
              email: existingUser.email,
              userImage: existingUser.userImage,
            },
            token,
          });
        } else {
          console.log("error generating a token");
          res.status(400).json({
            msg: "Something went wrong with your request",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "I don't have a clue whats wrong!",
    });
  }
};

const getProfle = async (req, res) => {
  console.log("get profile");
  console.log("req.user---->", req.user);
  if (req.user) {
    res.status(200).json({
      user: {
        _id: req.user.id,
        userName: req.user.userName,
        email: req.user.email,
        userImage: req.user.userImage,
        userWebsite: req.user.userWebsite,
        userBio: req.user.userBio,
        posts: req.user.posts,
        favs: req.user.favs,
      },
    });
  }

  if (!req.user) {
    res.status(200).json({
      msg: "You need to authorize first",
    });
  }
};

const updateUserData = async (req, res) => {
  console.log("Server Response", req.body);
  const elementName = req.body.elementName;
  const elementValue = req.body.elementValue;
  const filter = { email: req.body.email };
  const update = { [`${elementName}`]: elementValue };

  // * This section covers connecting user with his posts
  if (req.body.elementName === "posts") {
    let updatedUser = await userModel.findOneAndUpdate(
      filter,
      { $push: { posts: req.body.elementValue } },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: "Posts populated properly",
    });
  } else if (req.body.elementName === "favs") {
    let updatedUser = await userModel.findOneAndUpdate(
      filter,
      { $push: { favs: req.body.elementValue } },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: "Favs populated properly",
    });
  } else if (req.body.elementName === "userComment") {
    let updatedUser = await userModel.findOneAndUpdate(
      filter,
      { $push: { comments: req.body.elementValue } },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: "Favs populated properly",
    });
  } else {
    // * Or just continue with updateing other user fields
    let updatedUser = await userModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json({
      msg: "User updated successfully",
    });
  }
};

const deleteFromUserArray = async (req, res) => {
  const filter = { email: req.body.email };

  if (req.body.elementName === "favs") {
    let updatedUser = await userModel.findOneAndUpdate(
      filter,
      { $pull: { favs: req.body.elementValue } },
      {
        new: true,
      }
    );
    res.status(200).json({
      msg: "Value deleted properly from array",
    });
  }
};

const getAllUserPosts = async (req, res) => {
  const userPosts = await userModel
    .findOne({ email: req.body.email })
    .populate({
      path: "posts",
      select: ["title", "description", "location", "imageUrl"],
    })
    .exec();
  res.status(200).json({
    msg: "Posts field populated successfully",
    posts: userPosts.posts,
  });
};

const getAllFavs = async (req, res) => {
  const userFavs = await userModel
    .findOne({ email: req.body.email })
    .populate({ path: "favs", select: ["_id", "title"] })
    .exec();
  res.status(200).json({
    msg: "Populate worked",
    favs: userFavs.favs,
  });
};

const deleteUser = async (req, res) => {
  const userToDelete = await userModel.findById(req.body._id);
  // console.log(userToDelete);
  userToDelete.posts.forEach(async (post) => {
    let postToDelete = await postModel.findByIdAndDelete(post);
  });

  userToDelete.comments.forEach(async (comment) => {
    let commentToDelete = await commentModel.findByIdAndDelete(comment);
  });

  let deleteUser = await userModel.findByIdAndDelete(req.body._id);

  res.json({ msg: "user deleted successfully" });
};

export {
  uploadImage,
  deleteImage,
  register,
  login,
  getProfle,
  updateUserData,
  getAllUserPosts,
  getAllFavs,
  deleteFromUserArray,
  deleteUser,
};
