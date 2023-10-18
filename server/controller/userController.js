import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { bcrypt_hash } from "../utils/bcrypt_config.js";
import { response } from "express";

const uploadImage = async (req, res) => {
  //   * Upload file to cloudinary
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "userImages",
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
          });

          const savedUser = await newUser.save();
          res.status(201).json({
            msg: "New user registered",
            user: {
              userName: savedUser.userName,
              email: savedUser.email,
              userImage: savedUser.userImage,
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

export { uploadImage, register };
