import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  // * FILE EXTENSION
  const extension = path.extname(file.originalname);

  if (extension !== ".png" && extension !== ".jpg" && extension !== "jpeg") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;
