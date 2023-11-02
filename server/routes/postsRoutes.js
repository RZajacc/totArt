import express from "express";
import { addNewPost, getAllPosts } from "../controller/postController.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.post("/addNewPost", addNewPost);

export default router;
