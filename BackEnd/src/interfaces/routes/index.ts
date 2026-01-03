import { Router } from "express";
import authRoutes from "./authRoutes";
import appointmentRoutes from "./appointmentRoutes";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminOnly } from "../middlewares/roleMiddleware";

import protectedRoutes from "./protectedRoutes";

const router = Router();

/* router.use("/protected", protectedRoutes); */

/* router.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
}); */
/* router.get("/admin", authMiddleware, adminOnly, (req, res) => {
  res.json({ message: "Solo admin" });
}); */

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);

export default router;
