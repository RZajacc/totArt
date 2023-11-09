import express from "express";
import {
  addNewComment,
  deleteComment,
} from "../controller/commentsController.js";

const router = express.Router();

router.post("/addComment", addNewComment);
router.post("/deleteComment", deleteComment);

export default router;
