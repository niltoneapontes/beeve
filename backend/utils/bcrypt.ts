import { compare, hash } from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await compare(password, hashedPassword);
};
