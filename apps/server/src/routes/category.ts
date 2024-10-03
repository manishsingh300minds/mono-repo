import { getCategories } from "../controllers/category";
import { Router } from 'express';

const router = Router();

router.get('/categories', getCategories);

export default router;

