import { Router } from "express";
import {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
} from "../controllers/appointmentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";
import { cancelAppointment } from "../controllers/appointmentController";

const router = Router();

router.post("/", authMiddleware, createAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.get("/", authMiddleware, adminOnly, getAllAppointments);
router.delete("/:id", authMiddleware, cancelAppointment);

export default router;
