import express from "express";
import {
  getProfle,
  login,
  register,
  updateUserImage,
  uploadImage,
} from "../controller/userController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/register", register);
router.post("/login", login);
router.post("/updateUser", updateUserImage);
router.get("/profile", jwtAuth, getProfle);

export default router;
