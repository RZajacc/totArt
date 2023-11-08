import express from "express";
import colors from "colors";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import postRoute from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportConfig from "./config/passport.js";

dotenv.config();

// * CREATE APP
const app = express();

// * 1_DB CONNECTION
const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to MONGODB established".bgGreen);
  } catch (error) {
    console.log("Connection to MONGODB failed".bgRed);
  }
};

// * 2_APP MIDDLEWARES
const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  cloudinaryConfig();
  passport.initialize();
  passportConfig(passport);
};

// * 3_ADD ROUTES
const addRoutes = () => {
  app.use("/api/posts", postRoute);
  app.use("/api/users", userRoutes);
  app.use("/api/comments", commentRoutes);
};

// * 4_START SERVER
const startServer = () => {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log("Server running on port :".italic.magenta.bold, port);
  });
};

(async function controller() {
  await DBConnection();
  addMiddlewares();
  addRoutes();
  startServer();
})();
