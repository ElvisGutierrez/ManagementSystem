import { Router } from "express";
import {
  createAppointment,
  getAllAppointments,
  getMyAppointments,
} from "../controllers/appointmentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", authMiddleware, createAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.get("/", authMiddleware, adminOnly, getAllAppointments);

export default router;
