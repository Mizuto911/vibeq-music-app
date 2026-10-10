import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function isPasswordMatch(plainText: string, hashed: string) {
  return await bcrypt.compare(plainText, hashed);
}
