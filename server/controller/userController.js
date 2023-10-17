import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (req, res) => {
  //   * Upload file to cloudinary
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: "userImages",
  };

  if (req.file) {
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(req.file.path, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(500).json({
      error: "File type not supported",
    });
  }
};

export { uploadImage };
