import { Router, IRouter } from "express";
import validateSchema from "../middlewares/schemaMiddleware";
import { testSchema } from "../schemas/testSchema";
import { validateToken } from "../middlewares/authMiddleware";
import {
  getTests,
  getTestsByTeachers,
  postTest,
} from "../controllers/testControllers";

const testRouter: IRouter = Router();

testRouter.post("/tests", validateSchema(testSchema), validateToken, postTest);
testRouter.get("/tests/terms", validateToken, getTests);
testRouter.get("/tests/teachers", validateToken, getTestsByTeachers);

export default testRouter;
