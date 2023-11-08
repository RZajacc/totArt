import express from "express";
import { addNewComment } from "../controller/commentsController.js";

const router = express.Router();

router.post("/addComment", addNewComment);

export default router;
