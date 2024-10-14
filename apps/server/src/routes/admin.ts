import { createAdmin } from "../controllers/admin";
import { Router } from 'express';

const router = Router();

router.post('/admin', createAdmin);

export default router;

