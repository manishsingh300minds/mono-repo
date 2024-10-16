import { Router } from "express";
import adminRoutes from "./admin";
import productRoutes from "./product";
import categoryRoutes from "./category";
import { authenticateToken } from "../middlewares/authenticate-token";

const router = Router();

router.use("/",adminRoutes);
router.use("/", authenticateToken,[productRoutes, categoryRoutes]);

export default router;
