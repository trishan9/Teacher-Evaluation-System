import bcrypt from "bcrypt";

const generate = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

const hash = { generate, compare };

export default hash;
