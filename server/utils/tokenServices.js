import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };
  const sercretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY;
  const options = {
    expiresIn: "3 days",
  };
  const token = jwt.sign(payload, sercretOrPrivateKey, options);
  return token;
};

export { generateToken };
