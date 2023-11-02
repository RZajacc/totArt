import express from "express";
import {
  deleteImage,
  getProfle,
  login,
  register,
  updateUserData,
  uploadImage,
} from "../controller/userController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/imageDelete", deleteImage);
router.post("/register", register);
router.post("/login", login);
router.post("/updateUser", updateUserData);
router.get("/profile", jwtAuth, getProfle);

export default router;
