import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  countryCode: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
  },
});

const cityModel = mongoose.model("city", citySchema);

export default cityModel;
