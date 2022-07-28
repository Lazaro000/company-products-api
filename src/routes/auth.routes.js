import { Router } from 'express';
import { signIn, signUp } from 'src/controllers/auth.controller.js';
import {
  checkExistingRole,
  checkExistingUser,
} from 'src/middlewares/verifySignup.js';

const router = Router();

router.post('/signup', [checkExistingUser, checkExistingRole], signUp);
router.post('/signin', signIn);

export const authRoutes = router;
