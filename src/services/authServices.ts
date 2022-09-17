import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as authRepository from "../repositories/authRepository";
import * as encrypt from "../utils/encryptionUtils";
dotenv.config();

const jwtKey: string = process.env.JWT_KEY || "jwt-key";

export async function newUser(user: authRepository.UserInsertData) {
  const { email, password: decryptedPassword } = user;
  const password = encrypt.hashPassword(decryptedPassword);
  try {
    const isUserValid = await authRepository.findByEmail(user.email);
    if (isUserValid) {
      throw "invalid_email";
    }

    await authRepository.insert({ email, password });
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}

export async function login(user: authRepository.UserInsertData) {
  const { email, password } = user;
  try {
    const dbUser = await authRepository.findByEmail(email);
    if (!dbUser) {
      throw "email_not_found";
    }

    if (!encrypt.compareHash(password, dbUser.password)) {
      throw "incorrect_password";
    }

    const token = jwt.sign({ id: dbUser.id }, jwtKey);
    return token;
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}
