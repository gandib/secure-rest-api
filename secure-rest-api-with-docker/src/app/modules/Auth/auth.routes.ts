import express from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import passport from 'passport';
import { authorizeRoles } from '../../utils/authorizeRoles';
import { loginRateLimiter } from '../../utils/loginRateLimiter';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidations.createUserValidation),
  authControllers.createUser,
);

router.post(
  '/login',
  loginRateLimiter,
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('user', 'admin'),
  authControllers.getUser,
);

export const authRoutes = router;
