import { compare, hash } from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};
