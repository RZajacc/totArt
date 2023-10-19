import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const payload = {
    sub: userId,
  };

  // * To change to env
  const sercretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY;

  const token = jwt.sign(payload, sercretOrPrivateKey);
  console.log(token);

  return token;
};

export { generateToken };
