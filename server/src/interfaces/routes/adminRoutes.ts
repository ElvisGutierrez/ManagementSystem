import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";
import { adminCancelAppointment } from "../controllers/appointmentController";

const router = Router();

router.use(authMiddleware);
router.use(adminOnly);

router.delete("/appointments/:id", adminCancelAppointment);

export default router;
