import cityModel from "../models/cityModel.js";

const getAllCities = async (req, res) => {
  const allCities = await cityModel.find();

  res.json({
    number: getAllCities.length,
    cities: allCities,
  });
};

export { getAllCities };
