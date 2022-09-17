import { Router, IRouter } from "express";
import validateSchema from "../middlewares/schemaMiddleware";
import * as schemas from "../schemas/authSchemas";
import { login, signUp } from "../controllers/authControllers";

const authRouter: IRouter = Router();

authRouter.post("/sign-up", validateSchema(schemas.signUpSchema), signUp);
authRouter.post("/login", validateSchema(schemas.signInSchema), login);

export default authRouter;
