import { Router } from "express";
import adminRoutes from "./admin";
import productRoutes from "./product";
import categoryRoutes from "./category";

const router = Router();

router.use("/", [adminRoutes, productRoutes, categoryRoutes]);

export default router;
