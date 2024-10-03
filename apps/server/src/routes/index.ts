import { Router } from "express";
import productRoutes from "./product";
import categoryRoutes from "./category";

const router = Router();

router.use("/", [productRoutes, categoryRoutes]);

export default router;
