import museumModel from "../models/museumModel.js";

const getAllMuseums = async (req, res) => {
  const allMuseums = await museumModel.find();

  res.json({
    number: allMuseums.length,
    museums: allMuseums,
  });
};

export { getAllMuseums };
