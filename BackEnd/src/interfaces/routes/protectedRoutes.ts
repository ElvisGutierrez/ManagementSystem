import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida",
    user: req.user,
  });
});

export default router;
