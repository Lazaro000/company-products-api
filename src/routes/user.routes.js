import { Router } from 'express';
import { createUser } from 'src/controllers/user.controller.js';
import { isAdmin, verifyToken } from 'src/middlewares/authJwt.js';
import { checkExistingRole } from 'src/middlewares/verifySignup.js';

const router = Router();

router.post('/', [verifyToken, isAdmin, checkExistingRole], createUser);

export const userRoutes = router;
