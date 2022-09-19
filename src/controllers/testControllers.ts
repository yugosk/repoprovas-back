import { Request, Response } from "express";
import * as testServices from "../services/testServices";
import { TestInsertData } from "../repositories/testRepository";

export async function postTest(req: Request, res: Response) {
  const newTest: TestInsertData = req.body;
  try {
    await testServices.newTest(newTest);
    res.status(201).send("Test posted succesfully");
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}

export async function getTests(req: Request, res: Response) {
  try {
    const tests = await testServices.getTests();
    res.send(tests);
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}

export async function getTestsByTeachers(req: Request, res: Response) {
  try {
    const tests = await testServices.getTestsByTeachers();
    res.send(tests);
  } catch (err: ErrorEvent | any) {
    throw err;
  }
}
