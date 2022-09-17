import { Router, IRouter } from "express";
import authRouter from "./authRouter";

const router: IRouter = Router();

router.use(authRouter);

export default router;
