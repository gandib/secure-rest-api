import express from 'express';
import { authControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';
import passport from 'passport';
// import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidations.createUserValidation),
  authControllers.createUser,
);

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.loginUser,
);

router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  authControllers.getUser,
);

export const authRoutes = router;
