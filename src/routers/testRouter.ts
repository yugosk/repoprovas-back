import { Router, IRouter } from "express";
import validateSchema from "../middlewares/schemaMiddleware";
import { testSchema } from "../schemas/testSchema";
import { validateToken } from "../middlewares/authMiddleware";
import { postTest } from "../controllers/testControllers";

const testRouter: IRouter = Router();

testRouter.post("/tests", validateSchema(testSchema), validateToken, postTest);

export default testRouter;
