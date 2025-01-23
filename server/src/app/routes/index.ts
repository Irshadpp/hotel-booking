import express from "express"
import { userRouter } from "./user.routes";
import { hotelRouter } from "./hotel.routes";
import { bookingRouter } from "./booking.routes";

const router = express.Router();

router.use("/user",userRouter);
router.use("/hotel",hotelRouter);
router.use("/booking",bookingRouter);

export {router as appRouter}