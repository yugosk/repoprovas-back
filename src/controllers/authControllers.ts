import { Request, Response } from "express";
import * as authServices from "../services/authServices";

export async function signUp(req: Request, res: Response) {
  const { email, password, confirmPassword } = req.body;

  if (confirmPassword !== password) {
    throw "unmatching_passwords";
  }

  try {
    await authServices.newUser({ email, password });
    res.status(201).send("User created succesfully");
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}

export async function login(req: Request, res: Response) {
  const userCredentials = req.body;
  try {
    const token = await authServices.login(userCredentials);
    res.status(200).send(token);
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}
