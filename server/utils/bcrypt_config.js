import bcrypt from "bcrypt";

const bcrypt_hash = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export { bcrypt_hash };
