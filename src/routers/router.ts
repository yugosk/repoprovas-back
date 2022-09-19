import { Router, IRouter } from "express";
import authRouter from "./authRouter";
import testRouter from "./testRouter";

const router: IRouter = Router();

router.use(authRouter);
router.use(testRouter);

export default router;
