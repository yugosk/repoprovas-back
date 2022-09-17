import express from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routers/router";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export default app;
