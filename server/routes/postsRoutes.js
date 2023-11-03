import express from "express";
import {
  addNewPost,
  getAllPosts,
  getDetails,
} from "../controller/postController.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.post("/details", getDetails);
router.post("/addNewPost", addNewPost);

export default router;
