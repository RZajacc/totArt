import express from "express";
import {
  addNewPost,
  getAllPosts,
  getAllUserPosts,
  getDetails,
} from "../controller/postController.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.post("/details", getDetails);
router.post("/addNewPost", addNewPost);
router.get("/allUserPosts", getAllUserPosts);

export default router;
