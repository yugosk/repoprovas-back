import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtKey: string = process.env.JWT_KEY || "jwt-key";

export async function validate(token: string) {
  return jwt.verify(token, jwtKey);
}
