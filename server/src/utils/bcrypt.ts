import bcrypt, { genSalt, hash } from "bcrypt";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched;
};

export { hashPassword, comparePassword };
