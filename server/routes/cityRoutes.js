import express from "express";
import { getAllCities } from "../controller/cityController.js";

const router = express.Router();

router.get("/all", getAllCities);

export default router;
