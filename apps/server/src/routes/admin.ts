import { createAdmin, login } from "../controllers/admin";
import { Router } from 'express';

const router = Router();

router.post('/admin', createAdmin);
router.post('/login', login);

export default router;
