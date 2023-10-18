import express from "express";
import { register, uploadImage } from "../controller/userController.js";
import multerUpload from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), uploadImage);
router.post("/register", register);

export default router;
