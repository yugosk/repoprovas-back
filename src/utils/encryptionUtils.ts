import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function compareHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
