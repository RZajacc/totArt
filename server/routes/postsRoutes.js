import express from "express";
import {
  addNewPost,
  getAllPosts,
  getDetails,
  updatePost,
} from "../controller/postController.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.post("/details", getDetails);
router.post("/addNewPost", addNewPost);
router.post("/updatePost", updatePost);

export default router;
