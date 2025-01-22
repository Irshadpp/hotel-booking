import express from "express"
import { userRouter } from "./user.routes";
import { hotelRouter } from "./hotel.routes";

const router = express.Router();

router.use("/user",userRouter);
router.use("/hotel",hotelRouter);

export {router as appRouter}