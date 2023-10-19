import express from "express";
import { login, register, uploadImage } from "../controller/userController.js";
import multerUpload from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/register", register);
router.post("/login", login);

export default router;
